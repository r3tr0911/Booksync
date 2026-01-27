/*
createLibro             x
getAll                  x
getLibroById            x
updateLibro             x
deleteLibro             x
*/

const Libro = require("../models/libro.model");

class LibroController {

    //CREAMOS LIBROS
    static async createLibro(req, res){
        try {
            const {titulo, autor, genero, anio_publicacion, cantidad_disponible, isbn} = req.body

            if(!titulo || !autor || !genero || !anio_publicacion || cantidad_disponible === undefined || !isbn){
                return res.status(400).json({
                    message: "Todos los campos son requeridos"
                })
            }

            const libroId = await Libro.create({titulo, autor, genero, anio_publicacion, cantidad_disponible, isbn});
            
            return res.status(201).json({
                message: "Libro creado correctamente",
                libroId
            }) 

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al crear libro "
            })
        }
    } 

    //LISTAMOS LIBROS
    static async getAllLibros(req, res) {
        try {
            const libros = await Libro.findAll();

            return res.json(libros);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener los libros"
            })
        }
    }

    //OBTENEMOS LIBRO POR ID
    static async getLibroById(req, res){
        try {
            const { id } = req.params;
    
            const libro = await Libro.findById(id);
    
            if(!libro){
                return res.status(404).json({
                    message: "Libro no encontrado"
                });
            }
    
            return res.json(libro);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener el libro"
            })
        }
    }

    // Actualizar libros
    static async updateLibro(req, res){
        try {
            const { id } = req.params;
            const {
                titulo, 
                autor, 
                genero, 
                anio_publicacion, 
                cantidad_disponible, 
                isbn, 
                estado
            } = req.body

            if (
                !titulo && !autor && !genero && !anio_publicacion &&
                cantidad_disponible === undefined && !isbn && estado === undefined
            ) {
                return res.status(400).json({ message: "No hay campos para actualizar" });
            }

            const updated = await Libro.update(id, {
                titulo, 
                autor, 
                genero, 
                anio_publicacion, 
                cantidad_disponible, 
                isbn, 
                estado
            })
            

            if(!updated){
                return res.status(404).json({
                    message: "Libro no encontrado o sin cambios"
                })    
            }

            return res.json({
                message: "Libro actualizado correctamente"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al actualzar el libro"
            })
        }
    }

    //borrar libro (Soft delete)
    static async deleteLibro (req, res){
        try {
            const { id } = req.params

            const deleted = await Libro.delete(id)

            if(!deleted){
                return res.status(404).json({
                    message: "Libro no encontrado"
                });
            }

            return res.json({
                message: "Libro eliminado correctamente"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al eliminar el libro"
            });
        }
    }
}

module.exports = LibroController;