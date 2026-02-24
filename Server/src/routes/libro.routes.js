const express = require("express");
const LibroController = require("../controllers/libro.controller")
const verifyToken = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/", verifyToken, LibroController.createLibro);

router.get("/", verifyToken, LibroController.getAllLibros);

router.get("/genres", verifyToken, LibroController.getGenres);

router.get("/:id", verifyToken, LibroController.getLibroById);

router.put("/:id", verifyToken, LibroController.updateLibro);

router.delete("/:id", verifyToken, LibroController.deleteLibro);

module.exports = router;