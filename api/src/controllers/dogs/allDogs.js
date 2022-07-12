const getAll = require("../dogs/getApiDogs");

const getAllDogs = async (req, res) => {
  const { name } = req.query;
  const allDogs = await getAll();

  if (!name) {
    res.status(200).json(allDogs);
  } else {
    const filtered = allDogs.filter((e) => {
      const names = e.name.toUpperCase();
      if (names.includes(name.toUpperCase())) return names;
    });
    filtered.length
      ? res.status(200).json(filtered)
      : res.status(400).send("not found");
  }
};

module.exports = getAllDogs;
