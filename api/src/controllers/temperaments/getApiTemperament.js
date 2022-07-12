const axios = require("axios");
const { Temperament } = require("../../db");

const getTemperament = async (req, res) => {
  const temperamentApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  const temperament = temperamentApi.data
    .map((e) => e.temperament)
    .toString()
    .trim()
    .split(/\s*,\s*/);
  const alltemp = temperament.filter((a) => {
    return a.length !== 0;
  });

  alltemp.forEach((e) => {
    Temperament.findOrCreate({
      where: { name: e },
    });
  });

  const allTemperaments = await Temperament.findAll();
  res.json(allTemperaments);
};

module.exports = getTemperament;
