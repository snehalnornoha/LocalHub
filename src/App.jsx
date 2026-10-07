import { useState } from 'react'

import {  Routes, Route,NavLink } from "react-router-dom";
import { Search, User, Bell, MapPin ,Home, Upload,Bookmark, Info, LogInIcon } from "lucide-react";
import app_logo from './assets/app_logo.png'
import profile from './assets/profile.jpg'

import './App.css'
import Ahome from './content/Home';

import About_app from './content/Aboutapp';
import Auth from './content/Login';

function App() {
  const [isLogedin, setIsLogedin] = useState(false)
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
          <NavLink className="menu_item"><Upload className='micons'></Upload><h2>Upload</h2></NavLink>
          <NavLink className="menu_item"><User className='micons'></User><h2>Profile</h2></NavLink>
          <NavLink className="menu_item"><Bookmark className='micons'></Bookmark ><h2>Liked and saved</h2></NavLink>
          <NavLink className="menu_item"  to = "/logpage"><LogInIcon className='micons'></LogInIcon ><h2>{isLogedin?"Login":"Logout"}</h2></NavLink>
          <NavLink className="menu_item info"  to =  "/about_app"><Info className='micons'/><h2>About</h2></NavLink>
          <div className="menu_item user_profile">
            <img  src={profile} alt="profile img" />
          <span>
            <h2>{"Snehal"}</h2>
            {"Business"}
           </span>

          </div>
        </nav>


      </div>
      <div className="main_content">

        <Routes>
            <Route path="/" element={<Ahome/>} />
            <Route path="/about_app" element={<About_app/>} />
           
           
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
