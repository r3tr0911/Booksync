//importamos configuracion de la bd
const pool = require ("../config/db");


class Favorito {

    //AGREGAR FAVORITOS
    static async addFavorite(idUsuario, idLibro){
        const sql = `INSERT INTO favorito (id_usuario, id_libro) VALUES (?, ?)`

        const [result] = await pool.query(sql, [idUsuario, idLibro]);
        return result.insertId;
    }

    //BORRAR FAVORITOS
    static async deleteFavorite(idUsuario, idLibro){
        const sql = `DELETE FROM favorito WHERE id_usuario = ? AND id_libro = ?`;
        const [result] = await pool.query(sql, [idUsuario, idLibro]);

        return result.affectedRows > 0;
    }

    //MOSTRAR TODOS LOS FAVORITOS 
    static async listFavorites(idUsuario){
        const sql = `
        SELECT
        l.id_libro,
        l.title,
        l.author,
        l.genre,
        l.publication_year,
        l.available_quantity,
        l.isbn,
        l.status,
        l.location,
        l.cover,
        l.total_quantity,
        l.editorial,
        l.description   
        FROM favorito f
        INNER JOIN libro l ON l.id_libro = f.id_libro
        WHERE f.id_usuario = ?
        AND l.status != "inactivo"
        ORDER BY f.created_at DESC
        `

        const [rows] = await pool.query(sql, [idUsuario]);
        return rows;
    }

    
    //BUSCAR FAVORITO POR ID
    static async listIdfavorites(idUsuario){
        const sql = `SELECT id_libro FROM favorito WHERE id_usuario = ?`
        const [rows] = await pool.query(sql, [idUsuario]);
        return rows.map(row => row.id_libro);
    }

    //VERIFICAR SI EL LIBRO YA ES FAVORITO    
    static async existFavorite(idUsuario, idLibro){
        const sql = `SELECT 1 FROM favorito WHERE id_usuario = ? AND id_libro = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [idUsuario, idLibro]);
        return rows.length > 0;
    }
}   

module.exports = Favorito; 