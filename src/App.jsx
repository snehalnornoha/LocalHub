import { useRef, useState } from 'react'

import {  Routes, Route,NavLink } from "react-router-dom";
import { Search, User, Bell, MapPin ,Home, Upload,Bookmark, Info, LogInIcon } from "lucide-react";
import app_logo from './assets/app_logo.png'
import profile from './assets/profile.jpg'

import './App.css'
import Ahome from './content/Home';

import About_app from './content/Aboutapp';
import Auth from './content/Login';
import ForgotPassword from './content/forget_pass';
import CreatePost from './content/CreatePost';

function App() {


  const [isLogedin, setIsLogedin] = useState(false)
  const profMenu = useRef()


  ///Refresnse of data 
  const user_info = useRef({
    check : true,
    data :[]
  })
  const Explore = useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })
  const  Jobs = useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })
  const Events = useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })
  const Alerts = useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })
  const Advertisements = useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })
  const PublicNotices = useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })

  const logout = ()=>{
    console.log("logout")
  }
  const viewProfile = ()=>{
    console.log("viewPort")
  }
  if(isLogedin){
  return(
    <div className="app_parent">
      <div className="left_sidebar">
        <div className="small_profile">
          <img src={app_logo} alt="profile img" />
          <span>
            <h2>LocalHub</h2>
            build connection
           </span>
          
        </div>
        <nav className="menu_container">
          <NavLink className="menu_item" to ='/'><Home className='micons'></Home><h2>Home</h2></NavLink>
          <NavLink className="menu_item"><Bell className='micons'></Bell><h2>Notification</h2></NavLink>
          <NavLink className="menu_item" to='/upld'><Upload className='micons' ></Upload><h2>Upload</h2></NavLink>
          <NavLink className="menu_item" to ='/edit'><User className='micons'></User><h2>Profile</h2></NavLink>
          <NavLink className="menu_item"><Bookmark className='micons'></Bookmark ><h2>Liked and saved</h2></NavLink>
          <NavLink className="menu_item info"  to =  "/about_app"><Info className='micons'/><h2>About</h2></NavLink>
          
          <div className="menu_item user_profile" onMouseLeave={() => {profMenu.current.style.display = "none";}}>
             <div ref={profMenu}  className="profmenu">
            <button  onClick={logout}>Log out</button>
          </div >
            <img  onMouseEnter={() => {profMenu.current.style.display = "block";}}
                  
                   src={user_info.current.data.profile_image_url||profile} alt="profile img" />
          <span>
            <h2>{user_info.current.data.name}</h2>
            {user_info.current.data.role}
           </span>

          </div>
        </nav>


      </div>
      <div className="main_content">

        <Routes>
            <Route path="/" element={<Ahome key ="home" user_info={user_info} isLogedin={isLogedin} isedit={true}
            Explore = {Explore}  Jobs = {Jobs} Advertisements ={Advertisements}  PublicNotices={PublicNotices}
            Alerts = {Alerts} Events={Events} />} />
            <Route path="/about_app" element={<About_app/>} />
            <Route path="/reset"  element={<ForgotPassword/>} />
            <Route path="/upld"  element={<CreatePost user_info = {user_info}/>} />
            <Route path="/edit"  element={ <Ahome user_info={user_info} isLogedin={isLogedin} isedit={false}/> } />
           
           
        </Routes>
        

      </div>
      <div className="right_sidebar">
        
        <About_app/>
         

      </div>

    </div>
  )
  }
  else{
    return(<Auth setIslogedin ={setIsLogedin}/>)
  }


}

export default App

//            <Route path='/Noti'  element={<Notificationpage Notification = {Notification} setNoti_length = {setNoti_length}/>} />
