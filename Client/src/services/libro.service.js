import api from "./api"

//LISTAR LIBROS
export const getLibrosRequest = async () => {
    const response = await api.get("/libros")

    return response.data
}  

//CREAR LIBROS
export const createLibro = async (data) => {
    const response = await api.post("/libros", data);

    return response.data 
}

//ACTUALIZAR LIBROS
export const updateLibro = (id, data) => {
    return api.put(`/libros/${id}`, data)
}

//BORRAR LIBROS
export const deleteLibro = (id) => {
    return api.delete(`/libros/${id}`)
}