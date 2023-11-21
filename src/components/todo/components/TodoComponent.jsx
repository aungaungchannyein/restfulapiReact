import { useNavigate, useParams } from "react-router-dom"
import { retrieveTodoByIdApi ,updateTodoByIdApi, createTodoByIdApi} from "./api/TodoApiService"
import { useAuth } from "./security/AuthContent";
import { useEffect, useState } from "react";
import { Formik,Form,Field, ErrorMessage } from "formik";
import moment from "moment";

export default function TodoComponent(){
  const {id}= useParams();
  const authContext = useAuth();
  const navigate =useNavigate();
  const username =authContext.username;
  const [description,setDescription] = useState('');
  const [targetDate,setTargetDate]= useState('');

  useEffect(()=>retrieveTodo(),[id]);


  function retrieveTodo(){
    if(id!= -1){
      retrieveTodoByIdApi(username,id)
      .then(response=>{
        console.log(response);

        setDescription(response.data.description)
        setTargetDate(response.data.targetDate)
      })
      .catch(error =>console.log(error))
    }
  }

  function onsubmit(values){
    console.log(values);
    const todo ={
      id:id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false
    }
    console.log(values.description)
    if(id==-1){
      createTodoByIdApi(username, todo)
      .then(response=>{
        navigate('/todos')
      })
      .catch(error =>console.log(error))
    }else{
      updateTodoByIdApi(username,id, todo)
      .then(response=>{
        navigate('/todos')
      })
      .catch(error =>console.log(error))
  }
  }

  function validate(values){
    let errors={}
    if(values.description.length<5){
      errors.description= 'Enter at least 5 character'
    }
    if(values.targetDate === null|| values.targetDate ==='' || !moment(values.targetDate).isValid()){
      errors.targetDate='Enter target Date'
    }
    return errors;
  }
  return(
    <div>
      <h1>Enter todo Details</h1>
      <div>
        <Formik initialValues={{description,targetDate}}
        enableReinitialize={true}
        onSubmit={onsubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}>
          {(props)=>(
            <Form>
              <ErrorMessage name="description" component="div" className="alert alert-warning"/>
              <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
              <fieldset className="form-group">
                <label>Description</label>
                <Field type="text" className="form-control" name="description"/>
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate"/>
              </fieldset>
              <div><button className="btn btn-success m-5" type="submit">Save</button></div>
            </Form>
          )}
        </Formik>
      </div>
      
    </div>
  )
}