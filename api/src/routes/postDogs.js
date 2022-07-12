const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { name, height, weight, life_span, image, temperament } = req.body;
  console.log(temperament);
  const a = temperament.split(",");
  const b = a.map((e) => e.trim());

  try {
    if (!name || !height || !weight || !life_span || !temperament) {
      return res.send("Se necesitan completar todos los campos");
    }
    const findDog = await Dog.findAll({ where: { name: name } });
    if (findDog.length != 0) {
      res.send("El nombre ya esta en uso");
      return alert("el nombre esta en uso");
    }

    let temperamentOfDog = await Temperament.findAll({
      where: { name: b },
    });
    if (temperamentOfDog.length === 0) {
      return res.send("se debe ingresar un temperamento valido");
    }
    let createDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
      b,
    });

    console.log(createDog);

    createDog.addTemperament(temperamentOfDog);

    res.send("El personaje fue creado con exito");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
