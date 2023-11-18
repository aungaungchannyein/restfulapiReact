import { useEffect, useState } from "react";
import { retrieveTodosBean } from "./api/TodoApiService";

function ListTodosComponent(){

  const today =new Date();
  const targetDate = new Date(today.getFullYear(+12,today.getMonth(),today.getDate()));
 
  const [todos,settodos]= useState([])

  useEffect(()=>
    refreshTodos(),[])
  
  function refreshTodos(){
    retrieveTodosBean('in28minutes')
        .then(response=>{
          settodos(response.data)
        })
        .catch(error =>console.log(error))
  }

  return(
    <div className="container">
      <h1>Things You Want To Do</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Description</td>
              <td>is Done!</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(todo=>(
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  {/* <td>{todo.targetDate.toDateString()}</td> */}
                 <td>{todo.targetDate.toString()}</td>
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