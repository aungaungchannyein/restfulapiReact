import { apiClient } from "./ApiClient";

export const retrieveTodosBean 
    = (username) => apiClient.get(`/users/${username}/todos`);
    //http://localhost:8080/users/in28minutes/todos

export const deleteTodosApi 
    = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoByIdApi 
    = (username,id) => apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoByIdApi
    = (username,id,todo) => apiClient.put(`/users/${username}/todos/${id}`,todo);

export const createTodoByIdApi
    = (username,todo) => apiClient.post(`/users/${username}/todos`,todo);