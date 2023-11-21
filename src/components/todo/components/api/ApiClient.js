import axios from 'axios';

// export const retrieveHelloWorldBean =axios.get('http://localhost:8080/hello-world')

export const apiClient = axios.create(
  {
    baseURL:'http://localhost:8080'
  }
)