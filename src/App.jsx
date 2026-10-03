import { useState } from 'react'

import {  Routes, Route,NavLink } from "react-router-dom";
import { Search, User, Bell, MapPin ,Home} from "lucide-react";
import profile_dumy from './assets/profile.jpg'

import './App.css'
import Ahome from './content/Home';

function App() {
  const [count, setCount] = useState(0)

  return(
    <div className="app_parent">
      <div className="left_sidebar">
        <div className="small_profile">
          <img src={profile_dumy} alt="profile img" />
          <span>
            <h2>Name</h2>
           Business
           </span>
          
        </div>
        <nav className="menu_container">
          <NavLink className="menu_item"><Home className='micons'></Home><h2>Home</h2></NavLink>
          <NavLink className="menu_item"><Home className='micons'></Home><h2>Home</h2></NavLink>
          <NavLink className="menu_item"><Home className='micons'></Home><h2>Home</h2></NavLink>
          <NavLink className="menu_item"><Home className='micons'></Home><h2>Home</h2></NavLink>
          <NavLink className="menu_item"><Home className='micons'></Home><h2>Home</h2></NavLink>
         
        </nav>

      </div>
      <div className="main_content">
        <Routes>
            <Route path="/" element={<Ahome/>} />
           
        </Routes>
        

      </div>
      <div className="right_sidebar">
         

      </div>

    </div>
  )


}

export default App
