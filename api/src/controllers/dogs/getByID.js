const getAll = require("../../controllers/dogs/getApiDogs");

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const allDogs = await getAll();
  console.log(allDogs);
  if (id) {
    const filtered = await allDogs.filter((e) => e.id == id);
    filtered.length
      ? res.status(200).json(filtered)
      : res.status(404).send("Raza no encontrada por ID");
  }
};

module.exports = getById;
