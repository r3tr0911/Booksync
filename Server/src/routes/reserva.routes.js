const express = require("express");
const ReservaController = require("../controllers/reserva.controller")
const verifyToken = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/:idLibro", verifyToken, ReservaController.create);

router.get("/mis", verifyToken, ReservaController.myList);

router.delete("/:idReserva", verifyToken, ReservaController.cancel);

module.exports = router;