import { createContext, useContext, useState } from "react"
import { executeBasicAuthenticationService,executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext=createContext()
export const useAuth=()=>useContext(AuthContext);

export default function AuthProvider({children}){

  const [number,setNumber] = useState(10);
  const [isAuthenticated,setAuthenticated] = useState(false);
  const [username,setUsername]= useState('');
  const [token,setToken]=useState('');

  // function login(userName,password){
  //   if (userName === 'chan'&& password ==='gaga'){
  //       setUsername(userName);
  //       setAuthenticated(true);
  //       return true;  
  //   }else{
  //       setAuthenticated(false);
  //       return false;
  //   }
  // }
 
  // async function login(userName,password){

  //   const baToken = 'Basic ' + window.btoa(userName+":"+password)
  //   try{
  //       const response = await executeBasicAuthenticationService(baToken)
        

  //       if (response.status ==200){
  //           setUsername(userName);
  //           setAuthenticated(true);
  //           setToken(baToken);
  //           apiClient.interceptors.request.use(
  //             (config) =>{
  //               config.headers.Authorization = baToken
  //               return config
  //             }
  //           )
  //           return true;  
  //       }else{
  //           logout()
  //           return false;
  //       }
  //     }catch(error){
  //       logout()
  //       return false;

  //     }
  // }

  // function logout(){
  //   setAuthenticated(false);
  //   setUsername(null);
  //   setToken(null);
  // }

  async function login(userName,password){

    try{
        const response = await executeJwtAuthenticationService(userName,password)
      

        if (response.status ==200){
          const JwtToken = 'Bearer ' +response.data.token;
            setUsername(userName);
            setAuthenticated(true);
            setToken(JwtToken);
            apiClient.interceptors.request.use(
              (config) =>{
                config.headers.Authorization = JwtToken
                return config
              }
            )
            return true;  
        }else{
            logout()
            return false;
        }
      }catch(error){
        logout()
        return false;

      }
  }

  function logout(){
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }
  
  return(
    <AuthContext.Provider value={{number,isAuthenticated,setAuthenticated,login,logout,username,token}}>
      {children}
    </AuthContext.Provider>
  )
}