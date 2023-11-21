import { BrowserRouter,Routes,Route, useParams,Link, Navigate} from "react-router-dom";
import "./TodoApp.css";

import LogoutComponent from "./components/LogoutComponent";
import ErrorComponent from "./components/ErrorComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListTodosComponent from "./components/ListTodosComponent";
import LoginComponent from "./components/LoginComponent";
import AuthProvider, { useAuth } from "./components/security/AuthContent";
import WelcomeComponent from "./components/WelcomeComponent";
import TodoComponent from "./components/TodoComponent";

function AuthenticatedRoute({children}){
  const authContext = useAuth();

  if(authContext.isAuthenticated)
    return children

  return <Navigate to='/' />
}


export default function TodoApp(){
  return(
    <div className="TodoApp">
      <AuthProvider>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          <Route path='/' element={<LoginComponent/>}></Route>
          <Route path='/login' element={<LoginComponent/>}></Route>

          <Route path='/todos' element={<AuthenticatedRoute><ListTodosComponent/></AuthenticatedRoute>}></Route>
          <Route path='/todo/:id' element={<AuthenticatedRoute><TodoComponent/></AuthenticatedRoute>}></Route>
          
          <Route path='/welcome/:username' element={<AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute>}></Route>
          <Route path='/logout' element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}></Route>
          <Route path='*' element={<ErrorComponent />}></Route>

        </Routes>
        <FooterComponent/>
      </BrowserRouter> 
      </AuthProvider>
    </div>
  )
}












