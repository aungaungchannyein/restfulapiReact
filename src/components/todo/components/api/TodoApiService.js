import axios from 'axios';

// export const retrieveHelloWorldBean =axios.get('http://localhost:8080/hello-world')

const apiClent = axios.create(
  {
    baseURL:'http://localhost:8080'
  }
)
export const retrieveTodosBean 
    = (username) => apiClent.get(`users/${username}/todos`);
    //http://localhost:8080/users/in28minutes/todos