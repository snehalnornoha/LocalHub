import './Login.css'
import { useActionState, useEffect, useState } from 'react';
import {useNavigate ,Link, data} from "react-router-dom";
import { mthdAPI } from '../controlers';
const API_URL = import.meta.env.VITE_API_URL;
import app_logo from '../assets/app_logo.png'
import ForgotPassword from './forget_pass';
//login fetch function


//handle the early validation
const handle_Login = async (state , frm_data) =>{
  let un= frm_data.get("username")
  let  pass = frm_data.get("password")
  let  cpass = frm_data.get("cpassword")
  let  mail = frm_data.get("Email")
  let ilg = frm_data.get("islog") === 'true'

  const log_url = ilg ?`api/signup`: `api/login`
  const js_send = {username : un , password : pass , gmail : mail };
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   console.log("blblb:",log_url , js_send,ilg)


  if(un && pass && mail ){
    const isPass = passwordRegex.test(pass);
    if(!isPass) {return {er : "min-char = 8 , must have atleast one Uppercase ,Lowercase, Number and special charcter",un ,pass ,cpass ,mail }};
      if(pass === cpass || !ilg){
        /*fetch */
        console.log("blblb:",log_url , js_send)
        const ans =await mthdAPI(log_url,'POST',js_send,true)
        console.log("msg" , ans)
        if(ans.success){
          return ans
        }
        else{
          return {er : ans.msg,un ,pass ,cpass ,mail }
        }
      }
        return {er : "mis-matching password",un ,pass ,cpass ,mail }
      }
  }


function Auth(props) {
  const [islog , setIslog] = useState(true)
  const [isedit, setIsedit] = useState(false)
  const [data ,action , panding] = useActionState(handle_Login)
  const navi = useNavigate()
  
  
  useEffect(() => {
    console.log("?///",data)
    if(data?.success)
    {
    props.setIslogedin(true)
    navi('/')
    }
   }, [data]);
  if(isedit){
      return(<ForgotPassword setIsedit={setIsedit}/>)
  }
  else{
  return (

    <div className="auth_parent">
        <div className="auth_child1">
        
        <div className="toggle">
            <button  onClick={()=>{setIslog(false)}} className={!islog?'isactive':'inactive'}>Log in</button>
            <button onClick={()=>{setIslog(true)}}  className={islog?'isactive':'inactive'}>Sign up</button>
         
        </div>
       
      
      
      <form action={action} className = "auth_form">
         <span className='text_welcome' >Welcome to <b>LocalHub</b></span>
        <input
            type="hidden"
            name="islog"
            value={islog}
        />
        
        <div className='input_container' >
          <p className='input_desc'>Username :</p>
          <input defaultValue={data?.un} name = "username" className="auth_input" type="text" placeholder="Username" />
        </div>
        
          <div className='input_container'>
            <p className='input_desc'>Email :</p>
            <input  defaultValue={data?.mail}  name = "Email"  className="auth_input" type="email" placeholder="Email" />
          </div>
  
        <div className='input_container'>
          <p className='input_desc'>Password :</p>
          <input  defaultValue={data?.pass}  name = "password" className="auth_input" type="password" placeholder="Password"  />
        </div>
        {islog&&       
          <div className='input_container'>
              <p className='input_desc'>Confirm password : </p>
              <input  defaultValue={data?.cpass}  className="auth_input"  name = "cpassword"  type="password" placeholder="Password" />
          </div>
          }


        <p style={{color : "red"}}>{data?.er}</p>
       
        {panding ? <p>loading ....</p>:
        <>
        <button   className = "sumbt" type="submit">{!islog ? 'Login' : 'Sign up'}</button>
        {!islog && <span onClick={()=>setIsedit(true)} className='links_f'>Forogot Password?</span>}
        </>
        }
      </form>
    </div>
    <div className="side_container">
        <img src={app_logo} alt="applogo" />
       <p> GOODNEIGHBOR · NORTHWOOD</p>
       <h1>
Better local life starts with a hello.
</h1><h2>
Find the shop around the corner, the event this weekend, and the neighbour who can help.</h2>
    </div>
    </div>
  )
}
}
export default Auth;