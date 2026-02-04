import api from "./api"

export const loginRequest = async (data) => {
    const response = await api.post("/auth/login", data);
    
    return response.data
}

export const registerRequest = async (data) => {
    const response = await api.post("/auth/register", data);

    return response.data
}