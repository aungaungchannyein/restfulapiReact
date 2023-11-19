import { useEffect, useState } from "react";
import { deleteTodosApi, retrieveTodosBean } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContent";

function ListTodosComponent(){

  const today =new Date();
  const targetDate = new Date(today.getFullYear(+12,today.getMonth(),today.getDate()));
 
  const [todos,settodos]= useState([]);
  const [message,setMessage] = useState('');
  const authContext=useAuth();
  const username =authContext.username;


  useEffect(()=>
    refreshTodos(),[])
  
  function refreshTodos(){
    retrieveTodosBean(username)
        .then(response=>{
          settodos(response.data)
        })
        .catch(error =>console.log(error))
  }
  function deleteTodo(id){
    deleteTodosApi(username,id)
        .then(() =>{
          setMessage(`Delete of Todo with ${id} successful`)
          refreshTodos()
        })
        .catch(error =>console.log(error))
  
  }

  return(
    <div className="container">
      <h1>Things You Want To Do</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>is Done!</th>
              <th>Target Date</th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(todo=>(
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  {/* <td>{todo.targetDate.toDateString()}</td> */}
                 <td>{todo.targetDate.toString()}</td>
                 <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListTodosComponent;