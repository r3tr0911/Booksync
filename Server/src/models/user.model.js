const pool = require ("../config/db")
/*
crar usuarios               x
buscar usuarios por id      x
buscar por correo           x
Actualizar usuario          x
borrar usuarios             x

cambiar password
cambiar tipo 
cambiar estado 
*/


class User {

    static async create({nombre, correo, password_hash}){
        const sql = `INSERT INTO usuario (nombre, correo, password_hash, tipo, estado) VALUES (?, ?, ?, 'usuario', 'activo')`;

        const [result] = await pool.query(sql, [nombre, correo, password_hash])
        return result.insertId;
    }

    static async findByEmail(correo){
        const sql = `SELECT id_usuario, nombre, correo, password_hash, tipo, estado FROM usuario WHERE correo = ?`

        const [rows] = await pool.query(sql, [correo]);
        return rows[0]
    }

    static async findById(idUsuario){
        const sql = `SELECT id_usuario, nombre, correo, password_hash, tipo, estado FROM usuario WHERE id_usuario= ?`

        const [rows] = await pool.query(sql, [idUsuario]);
        return rows[0];
    }

    static async update (idUsuario, {nombre, correo}){
        const sql = `UPDATE usuario SET nombre = ?, correo = ? WHERE id_usuario = ?`;

        const [result] = await pool.query(sql, [nombre, correo, idUsuario])
        return result.affectedRows > 0
    }

    static async delete(idUsuario){
        const sql = `UPDATE usuario SET estado = 'Inactivo' WHERE id_usuario = ?`;

        const [result] = await pool.query(sql, [idUsuario]);
        return result.affectedRows > 0
    }
}

module.exports = User;