import { useState } from 'react'

import {  Routes, Route,NavLink } from "react-router-dom";
import { Search, User, Bell, MapPin ,Home, Upload,Bookmark, Info } from "lucide-react";
import app_logo from './assets/app_logo.png'
import profile from './assets/profile.jpg'

import './App.css'
import Ahome from './content/Home';
import { Profiler } from 'react';

function App() {
  const [count, setCount] = useState(0)

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
          <NavLink className="menu_item"><Home className='micons'></Home><h2>Home</h2></NavLink>
          <NavLink className="menu_item"><Bell className='micons'></Bell><h2>Notification</h2></NavLink>
          <NavLink className="menu_item"><Upload className='micons'></Upload><h2>Upload</h2></NavLink>
          <NavLink className="menu_item"><User className='micons'></User><h2>Profile</h2></NavLink>
          <NavLink className="menu_item"><Bookmark className='micons'></Bookmark ><h2>Liked and saved</h2></NavLink>
          <NavLink className="menu_item"><Bookmark className='micons'></Bookmark ><h2>Liked and saved</h2></NavLink>
          <NavLink className="menu_item info"><Info className='micons'/><h2>About</h2></NavLink>
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
           
        </Routes>
        

      </div>
      <div className="right_sidebar">
        <h2>About LocalHub </h2>
         

      </div>

    </div>
  )


}

export default App
