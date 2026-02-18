/*
Crear libro	                create              x
Listar libros	            findAll             x
Obtener libro	            findById            x
Actualizar libro	        update              x
Eliminar (soft)             delete (soft)       x
 */

const pool = require ("../config/db")

class Libro {
    
    //CREAR LIBRO
    static async create({ 
        title, 
        author, 
        genre, 
        publication_year, 
        available_quantity, 
        location,
        isbn,
        cover,
    }){
        const sql = `
        INSERT INTO libro 
        (title, author, genre, publication_year, available_quantity, location, isbn, status, cover) 
        VALUES (?,?,?,?,?,?,?, 'disponible', ?)
        `;

        const [result] = await pool.query(sql, [title, author, genre, publication_year, available_quantity, location, isbn, cover]);
        return result.insertId
    };

    //Listar libros
    static async findAll(filters = {}){
        let sql = `SELECT 
            id_libro, 
            title, 
            author, 
            genre, 
            publication_year, 
            available_quantity,
            location, 
            isbn, 
            status,
            cover
            FROM libro WHERE status != 'inactivo'
        `;
        
        const values = [];

        if(filters.title){
            sql += ` AND title LIKE ?`
            values.push(`%${filters.title}%`);
        }

        if(filters.author){
            sql += ` AND author LIKE ?`
            values.push(`%${filters.author}%`);
        }

        if(filters.isbn){
            sql += ` AND isbn = ?`
            values.push(filters.isbn);
        }

        if(filters.genre){
            sql += ` AND genre = ?`
            values.push(filters.genre);
        }

        const [rows] = await pool.query(sql, values)
        return rows
    }

    //BUSCAR POR ID
    static async findById(idLibro){
        const sql = `SELECT 
        id_libro, 
        title, 
        author, 
        genre, 
        publication_year, 
        available_quantity,
        location,
        isbn,
        status,
        cover
        FROM libro WHERE id_libro = ? AND status != "inactivo"
        `;
    
        const [rows] = await pool.query(sql, [idLibro]);
        return rows[0];
        }
    
    // ACTUALIZAR USUARIO
    static async update (idLibro, data){
        const field = [];
        const values = [];

        for (const [key, value] of  Object.entries(data)){
            if(value !== undefined) {
                field.push(`${key} = ?`);
                values.push(value);
            }
        }

        if(field.length === 0){
            return false;
        }

        values.push(idLibro);

        const sql = `UPDATE libro SET ${field.join(', ')} WHERE id_libro = ?`;

        const [result] = await pool.query(sql, values);
        return result.affectedRows > 0
    }

    //BORRAR / DESACTIVAR USUARIO
    static async delete(idLibro){
        const sql = `UPDATE libro SET status = 'inactivo' WHERE id_libro = ?`;
    
        const [result] = await pool.query(sql, [idLibro]);
        return result.affectedRows > 0
    }
}

module.exports = Libro