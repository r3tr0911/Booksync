import api from "./api"

export const loginRequest = async (data) => {
    const response = await api.post("/auth/login", data);
    
    return response.data
}