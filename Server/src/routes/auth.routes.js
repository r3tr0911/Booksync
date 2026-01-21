const express = require("express");
const AuthController = require("../controllers/auth.controller")
const verifyToken = require("../middlewares/auth.middleware")


const router = express.Router();

//regitro
router.post("/register", AuthController.register)

//login
router.post("/login", AuthController.login)

//PRUEBA TOKEN
router.get("/test-protected", verifyToken, (req, res) => {
    res.json({
        message: "Accediste a una ruta protegida",
        user: req.user
    })
})

module.exports = router;
