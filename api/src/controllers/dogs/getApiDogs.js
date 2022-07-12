const axios = require("axios");
const { Dog, Temperament } = require("../../db");

const ApiData = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image.url,
      temperaments: e.temperament ? e.temperament : "No tiene temperamento",
      height: e.height.metric,
      weight: e.weight.metric.includes("NaN")
        ? (e.weight.metric = "8")
        : !e.weight.metric.includes("-")
        ? e.weight.metric
        : e.weight.metric,
      life_span: e.life_span,
    };
  });
  return apiInfo;
};

const getDBinfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAll = async () => {
  const apiInfo = await ApiData();
  const dbInfo = await getDBinfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = getAll;
