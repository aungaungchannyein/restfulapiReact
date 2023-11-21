import { apiClient } from "./ApiClient";
export const retrieveHelloWorldBean 
    = () => apiClient.get('/hello-world');

export const executeBasicAuthenticationService
    =(token) => apiClient.get(`/basicauth`,{
      headers:{
        Authorization: token
      }
    })