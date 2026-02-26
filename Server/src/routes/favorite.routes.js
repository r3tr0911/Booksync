const express = require("express");
const FavoritoController = require("../controllers/favorite.controller")
const verifyToken = require("../middlewares/auth.middleware")

const router = express.Router();

router.get("/", verifyToken, FavoritoController.getFavorites)

router.get("/ids", verifyToken, FavoritoController.getFavorites)

router.get("/:idLibro", verifyToken, FavoritoController.isFavorite)

router.post("/:idLibro", verifyToken, FavoritoController.addFavorite)

router.delete("/:idLibro", verifyToken, FavoritoController.deleteFavorite); 

module.exports = router;