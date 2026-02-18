const Libro = require("../models/libro.model");

class LibroController {

    //CREAMOS LIBROS
    static async createLibro(req, res){
        try {
            const {title, author, genre, publication_year, available_quantity, location, isbn, cover} = req.body

            if(!title || !author || !genre || !publication_year || available_quantity === undefined || !location || !isbn){
                return res.status(400).json({
                    message: "Todos los campos son requeridos"
                })
            }

            const libroId = await Libro.create({title, author, genre, publication_year, available_quantity, location, isbn, cover});
            
            return res.status(201).json({
                message: "Libro creado correctamente",
                libroId
            }) 

        } catch (error) {

            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Ya existe un libro con ese ISBN"
                });
            }

            console.error(error);
            return res.status(500).json({
                message: "Error al crear libro "
            })
        }
    } 

    //LISTAMOS LIBROS
    static async getAllLibros(req, res) {
        try {
                const filters = {
                    title: req.query.title,
                    author: req.query.author,
                    isbn: req.query.isbn,
                    genre: req.query.genre
                };
            const libros = await Libro.findAll(filters);

            return res.json({
                total: libros.length,
                libros
            });

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
                title, 
                author, 
                genre, 
                publication_year, 
                available_quantity, 
                location,
                isbn, 
                status,
                cover
            } = req.body

            if (
                title === undefined && author === undefined && genre === undefined && publication_year === undefined && available_quantity === undefined && location === undefined && isbn === undefined && status === undefined && cover === undefined
            ) {
                return res.status(400).json({ message: "No hay campos para actualizar" });
            }

            const updated = await Libro.update(id, {
                title, 
                author, 
                genre, 
                publication_year, 
                available_quantity, 
                location,
                isbn, 
                status,
                cover
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