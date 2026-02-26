const Favorito = require("../models/favorito.model")

class FavoritoController {

    //AGREGAR FAVORITOS
    static async addFavorite(req, res){
        try {
            const idUsuario = req.user.id; // viene del token de autenticación
            const idLibro = Number(req.params.idLibro);

            if(!Number.isInteger(idLibro) || idLibro <= 0){
                return res.status(400).json({
                    message: "id del Libro invalido "
                })
            }

            const Favorite = await Favorito.addFavorite(idUsuario, idLibro);

            return res.status(201).json({
                message: "Agregado a favoritos",
                Favorite
            })
            
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                return res.status(200).json({ message: "Ya estaba en favoritos" });
            }

            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                return res.status(404).json({ message: "El libro no existe" });
            }

            return res
                .status(500)
                .json({ message: "Error agregando favorito", error: error.message });
            }
        }

    //ELIMINIAR FAVORITOS
    static async deleteFavorite(req, res){
        try {
            const idUsuario = req.user.id; // viene del token de autenticación
            const idLibro = Number(req.params.idLibro);

            if(!Number.isInteger(idLibro) || idLibro <= 0){
                return res.status(400).json({
                    message: "id del Libro invalido "
                })
            }

            const removed = await Favorito.deleteFavorite(idUsuario, idLibro)

            if(!removed){
                return res.status(404).json({
                    message: "Favorito no encontrado"
                })
            }

            return res.json({ message: "Eliminado de favoritos" })

        } catch (error) {
            return res.status(500).json({
                message: "Error eliminando favorito", error: error.message
            })
        }
    };


    //MOSTRAR TODOS LOS FAVORITOS 
    static async getFavorites(req, res){
        try {
            const idUsuario = req.user.id; // viene del token de autenticación
            const favorite = await Favorito.listFavorites(idUsuario);

            return res.json({ favorite });

        } catch (error) {
            return res.status(500).json({ message: "Error listando favoritos", error: error.message });
        }
    }


    //BUSCAR FAVORITO POR ID
    static async getFavoritesId(req, res){
        try {
            const idUsuario = req.user.id; // viene del token de autenticación
            const favoriteId = await Favorito.listIdfavorites(idUsuario)
            return res.json({ favoriteId });
        } catch (error) {
            return res.status(500).json({ message: "Error listando favoritos por id", error: error.message });
        }
    }

    //VERIFICAR SI EL LIBRO YA ES FAVORITO
    static async isFavorite (req, res){
        try {
            const idUsuario = req.user.id; // viene del token de autenticación
            const idLibro = Number(req.params.idLibro);
    
            if (!Number.isInteger(idLibro) || idLibro <= 0) {
                return res.status(400).json({ message: "idLibro inválido" });
            }
    
            const isFav = await Favorito.existFavorite(idUsuario, idLibro);
            return res.json({ isFav });
            
        } catch (error) {
            return res.status(500).json({ message: "Error verificando favorito", error: error.message });
        }
    }
}

module.exports = FavoritoController;