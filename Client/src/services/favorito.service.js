import api from "./api";

//ya existe?
export const isFavorite = async (idLibro) => {
    const { data } = await api.get(`/favorite/${idLibro}`)
    return data;
}

//agregar favorito
export const addFavorite = async (idLibro) =>{
    const { data } = await api.post(`/favorite/${idLibro}`);
    return data; 
}

//borrar favorito
export const deleteFavorite = async (idLibro) => {
    const { data } = await api.delete(`/favorite/${idLibro}`);
    return data;
}

//mostra favoritos
export const getFavorites = async () => {
    const { data } = await api.get(`/favorite`);
    return data;
}