// MPV => crear usuarios x
// iniciar sesion x
//Mas adelante impelmentar refrestoken y logout etc.

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//PASARLO A .env 
const JWT_SECRET = "booksync_secret";


class AuthController {
    //regitro
    static async register (req, res){
        try {
            const {nombre, correo, password} = req.body;
            //validaciones basicas 
            if(!nombre || !correo || !password){
                return res.status(400).json({
                    message: "Todos los campos son obligatorios"
                });
            }
            //preguntamos si ya existe el usuario
            const existingUser = await User.findByEmail(correo)
            if(existingUser){
                return res.status(409).json({
                    message: "El correo ya esta registrado"
                })
            }
            //hashear contraseña
            const password_hash = await bcrypt.hash(password , 10)

            //creamos nuestro ussuario
            const userId = await User.create({nombre, correo, password_hash}) 
            
            return res.status(201).json({
                message: "Usuario creado exitosamente", userId
            })
            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Error al crear un usuario"
            })
        }
    }


    //LOGIN
    static async login(req, res){
        try {
            const {correo, password } = req.body
            
            //validaciones
            if(!correo || !password){
                return res.status(400).json({
                    message: "Todos los campos son obligatorios"
                })
            }

            //verificamos si existe
            const user = await User.findByEmail(correo)
            if(!user){
                return res.status(401).json({
                    message: "Credenciales inválidas"
                });
            } 

            //verificamos el estado
            if(user.estado !== "activo"){
                return res.status(403).json({
                    message: "Usuario inactivo"
                })
            }

            //comparamos contraseñas
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if(!isMatch){
                return res.status(401).json({
                    message: "Credenciales inválidas"
                });
            }

            //iniciar sesion Con token

            const token = jwt.sign(
                {
                    id: user.id_usuario,
                    correo: user.correo,
                    tipo: user.tipo
                }, JWT_SECRET, {
                    expiresIn: "12h"
                }
            )

            return res.status(200).json({
                message: "Login existoso", 
                token,
                user: {
                    id: user.id_usuario,
                    nombre: user.nombre,
                    correo: user.correo,
                    tipo: user.tipo
                }
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error, no se pudo iniciar sesión"
            })
        }
    }
}

module.exports = AuthController;