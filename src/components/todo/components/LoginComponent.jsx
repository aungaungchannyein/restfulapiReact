import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContent";

function LoginComponent(){

  const [userName,setUsername]= useState("enter name ");
  const [password,setPassword]= useState('');
  const [showErrorMessage, setshowErrorMessage]= useState(false);
  const navigate =useNavigate();
  const useContext = useAuth();

  function handleUsernameChange(event){
    setUsername(event.target.value);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handleSubmit(){
    if (useContext.login(userName,password)){
        navigate(`/welcome/${userName}`);  
        setshowErrorMessage(false);
    }else{
        setshowErrorMessage(true);
    }

  }

  

  return(
    <div className="Login">
      <h1>Time to Login!</h1>
     {showErrorMessage && <div className="successMessage">Authentication Failed.Please Check Your Credentials.</div>
    }
      <div className="LoginForm">
        <div>
          <label>User Name:</label>
          <input type="text" name="username" value={userName} onChange={handleUsernameChange}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}
export default LoginComponent;