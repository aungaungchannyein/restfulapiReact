import { Link,useParams } from "react-router-dom";
import { retrieveHelloWorldBean } from "./api/HelloWorlldApiService";

export default function WelcomeComponent(){

  const {username}=useParams();

  function callHelloWebApi(){
   retrieveHelloWorldBean()
        .then( (response) => successfulResponse(response))
        .catch((error)=> errrorResponse(error))
        .finally(()=>console.log('cleanup'))
  }

  function successfulResponse(response){
    console.log(response.data);
  }

  function errrorResponse(error){
    console.log(error);
  }
  return(
    <div className="WelcomeComponent">
      <h1>WelcomeComponent {username} </h1>  
      <div>Manage Your todos -<Link to='/todos'>Go Here</Link></div>
      <div>
      <button className="btn btn-success m-5" onClick={callHelloWebApi}>Call Hello world api</button>
 
      </div> 
    </div>
  )
}
