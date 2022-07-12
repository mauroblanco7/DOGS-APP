const { Router } = require("express");
const getAll = require("../controllers/dogs/getApiDogs");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allDogs = await getAll();
  if (id) {
    const filtered = await allDogs.filter((e) => e.id == id);
    filtered.length
      ? res.status(200).json(filtered)
      : res.status(404).send("Raza no encontrada por ID");
  }
});

module.exports = router;
