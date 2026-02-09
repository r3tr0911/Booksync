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
            const dataToUpdate = {};

            const {
            nombre,
            apellido,
            correo,
            fecha_nacimiento,
            tipo_documento,
            numero_documento
            } = req.body;

            if (nombre) dataToUpdate.nombre = nombre;
            if (apellido) dataToUpdate.apellido = apellido;
            if (correo) dataToUpdate.correo = correo;
            if (fecha_nacimiento) dataToUpdate.fecha_nacimiento = fecha_nacimiento;
            if (tipo_documento) dataToUpdate.tipo_documento = tipo_documento;
            if (numero_documento) dataToUpdate.numero_documento = numero_documento;

            if (Object.keys(dataToUpdate).length === 0) {
                return res.status(400).json({
                    message: "No se enviaron datos para actualizar"
                });
            }


            const updated = await User.update(userId, dataToUpdate)

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
