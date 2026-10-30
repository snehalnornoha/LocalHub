import { useRef, useState ,useEffect} from 'react'

import {  Routes, Route,NavLink } from "react-router-dom";
import { Search, User, Bell, MapPin ,Home, Upload,Bookmark, Info, LogInIcon, LogOutIcon, IndentIncrease, UserCheck2, UserCog2, ArrowBigUp, ArrowUp, ArrowUpCircleIcon } from "lucide-react";
import app_logo from './assets/app_logo.png'
import profile from './assets/profile.jpg'
import Upgrade from './content/upgrade.jsx'
import './App.css'
import Ahome from './content/Home';

import About_app from './content/Aboutapp';
import Auth from './content/Login';
import ForgotPassword from './content/forget_pass';
import CreatePost from './content/CreatePost';
import Library from './content/Library';
import Notificationpage from './content/Noti.jsx';
import { io } from "socket.io-client";
import { getAPI } from './controlers.jsx';

const path = import.meta.env.VITE_OTHER_SIDE_PATH;

function App() {


  const [isLogedin, setIsLogedin] = useState(false)
  const [noti_length, setNoti_length] = useState(0)
  const profMenu = useRef()


  ///Refresnse of data 
  const user_info = useRef({
    check : true,
    data :[]
  })
  const Notification= useRef({
    check : true,
    data :[]
  })
  const all_Cmnt= useRef({
    data :[]
  })

  const savedpst = useRef({
    check: true,
    page:{no : 0 , isnext : true},
    data: []
});
  const search = useRef({
    check: true,
    page:{no : 0 , isnext : true},
    data: [],
    value:""
});
  const mypst = useRef({
    check: true,
    page:{no : 0 , isnext : true},
    data: []
});

const likedpst = useRef({
    check: true,
    page:{no : 0 , isnext : true},
    data: []
});

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
 const reqst= useRef({
    check : true,
    page:{no : 0 , isnext : true},
    data :[]
  })

  useEffect(()=>{
    return()=>{

        logout()
    }
  },[])
  

   

  const logout = async()=>{
    try {
            const result= await getAPI('protectedApi/logout','GET',true)
          
    
            if (result.success) {
    
                // logout successful
                setIsLogedin(false);
                user_info.current.data = {}
                Notification.current.data = []            
                
            }
            else {
                throw new Error(`Logout Eroor :`);
            }
    
        } catch (err) {
            console.log(err);
            alert("log out error : pls try again");
        }
    
  }
  const viewProfile = ()=>{
    console.log("viewPort")
  }
useEffect( ()=> {
    console.log("jhi")
     if (!isLogedin || !Notification.current.check) {return}
    const fetchdata = async()=>{
        try{
            const results = await getAPI('protectedApi/all_noti','GET',true)
         
            if(results.success) {
              console.log("Notification by db :",results)
              Notification.current.data = results.data
              Notification.current.check = false
              const count = Notification.current.data.length || 0
              setNoti_length(prev => prev+count);
            }else{
                    throw new Error(`Request failed`);
               }
                    
          }catch(err){
            alert(err)
        }

    }

    fetchdata();
    
  },[isLogedin]);


useEffect(() => {
  
      if (!isLogedin) {return}
  
      const socket = io(`${path}`, {
          withCredentials: true
      });
  
     // socketRef.current = socket;
  
      socket.on("connect", () => {
          console.log("Socket connected:", socket.id);
      });
  
      socket.on("connect_error", (err) => {
          console.log("Socket error:", err.message);
      });
  
  
      const handleNotification = (data) => {
          console.log("Notification received:", data);
          console.log("Notification shit received:",Notification.current.data );
          Notification.current.data = [...Notification.current.data,{id : data.id , type : data.type , msg : data.msg}]
          console.log("Notification:", Notification.current.data)
          
          if(data.type === "Swap Request"){
            all_users_requests.current.check = true   
            
          }else if(data.type ==="Swap Transaction" ){
            console.log("hi")
  
          }
          setNoti_length(prev => prev+1);
  
      };
  
      socket.on("notification", handleNotification);
  
          return () => {
      socket.off("notification", handleNotification);
      socket.disconnect();
   
    
     /* if (socketRef.current === socket) {
          socketRef.current = null;
      }
          */}
  }, [isLogedin]);
  
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
          <NavLink className="menu_item" to='/Noti'><Bell className='micons'></Bell><h2>Notification</h2></NavLink>
          <NavLink className="menu_item" to='/upld'><Upload className='micons' ></Upload><h2>Upload</h2></NavLink>
          <NavLink className="menu_item" to ='/edit'><UserCog2 className='micons'/><h2>Profile</h2></NavLink>
          <NavLink className="menu_item" to ='/upgrd'><ArrowUpCircleIcon className='micons'/><h2>Upgrade</h2></NavLink>
          <NavLink className="menu_item" to ='/lib'><Bookmark className='micons'></Bookmark ><h2>Liked and saved</h2></NavLink>
          <NavLink className="menu_item info"  to =  "/about_app"><Info className='micons'/><h2>About</h2></NavLink>
           <div className="menu_item" onClick={()=>logout()}>
             <LogOutIcon/><h2>Log out</h2>
           </div>
        
        </nav>


      </div>
      <div className="main_content">

        <Routes>
            <Route path="/" element={<Ahome key ="home" user_info={user_info} isLogedin={isLogedin} isedit={true}
            Explore = {Explore}  Jobs = {Jobs} Advertisements ={Advertisements}  PublicNotices={PublicNotices}
            Alerts = {Alerts} Events={Events} all_Cmnt = {all_Cmnt}  savedpst={savedpst} likedpst={likedpst} search={search} noti_length={noti_length}/>} />
            <Route path="/edit" element={<Ahome  user_info={user_info} isLogedin={isLogedin} isedit={false}
            Explore = {Explore}  Jobs = {Jobs} Advertisements ={Advertisements}  PublicNotices={PublicNotices}
            Alerts = {Alerts} Events={Events} all_Cmnt = {all_Cmnt}  savedpst={savedpst} likedpst={likedpst} search={search} noti_length={noti_length}/>} />

            <Route path="/about_app" element={<About_app/>} />
            <Route path="/reset"  element={<ForgotPassword/>} />
            <Route path="/upld"  element={<CreatePost user_info = {user_info} mypst={mypst} Explore={Explore} />} />

            <Route path="/lib"  element={ <Library user_info={user_info} savedpst={savedpst} likedpst={likedpst} all_Cmnt={all_Cmnt} mypst={mypst}/>} />
            <Route path="/upgrd"  element={ <Upgrade user_info={user_info} reqst = {reqst}/> } />
            <Route path='/Noti'  element={<Notificationpage Notification = {Notification} setNoti_length = {setNoti_length}/>} />

           
           
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

