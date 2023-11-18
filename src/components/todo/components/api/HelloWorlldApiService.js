import axios from 'axios';

// export const retrieveHelloWorldBean =axios.get('http://localhost:8080/hello-world')

const apiClent = axios.create(
  {
    baseURL:'http://localhost:8080'
  }
)
export const retrieveHelloWorldBean 
    = () => apiClent.get('/hello-world');