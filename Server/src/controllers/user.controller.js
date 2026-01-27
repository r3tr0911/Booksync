const User = require("../models/user.model");


// CREAR userAll para obtener todos los usuarios 

class UserController {

    static async getProfile(req, res){
        try {
            const userId = req.user.id

            const user = await User.findById(userId)

            if(!user){
                return res.status(404).json({
                    message: "Usuario no encontrado"
                })
            }

            delete user.password_hash

            res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error en encontrar el perfil"
            })
        }
    }

        //Actualizamos perfil
    static async updateProfile(req, res){
        try {
            const userId = req.user.id;
            const {nombre, correo} = req.body;

            if(!nombre || !correo){
                return res.status(400).json({
                    message: "Nombre y correo son obligatiorios"
                })
            }

            const updated = await User.update(userId, {nombre, correo})

            if(!updated){
                res.status(404).json({
                    message: "Usuario no encontrado"
                })
            }

            return res.status(200).json({
                message: "Perfil actualizado existosamente"
            })

        } catch (error) {

            console.error(error);
            res.status(500).json({
                message: "Error al actualizar perfil"
            });
        }
    }

    //BORRAMOS UNA CUENTA /DESACTIAMOS
    static async deleteProfile(req, res){
        try {
            const userId = req.user.id;

            const deleted = await User.delete(userId);

            if(!deleted){
                return res.status(404).json({
                    message: "Usuario no encontrado"
                })
            }

            return res.json({
                message: "Usuario eliminado exitosamente"
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error al borrar usuario"
            })
        }
    }
}

module.exports = UserController
