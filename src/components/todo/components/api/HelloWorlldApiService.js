import { apiClient } from "./ApiClient";
export const retrieveHelloWorldBean 
    = () => apiClient.get('/hello-world');
