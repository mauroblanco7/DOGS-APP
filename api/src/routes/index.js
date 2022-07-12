const { Router } = require("express");
const getAllDogs = require("../controllers/dogs/allDogs");
const getTemperament = require("../controllers/temperaments/getApiTemperament");
const getById = require("./getbyid");
const postDogs = require("./postDogs");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/temperaments", getTemperament);
router.use("/create", postDogs);
router.get("/dogs", getAllDogs);
router.get("/:id", getById);

module.exports = router;
