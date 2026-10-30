import { useEffect, useState } from 'react';
import './Noti.css';
import {useNavigate ,Link} from "react-router-dom";
import { getAPI } from '../controlers';




const NoticCard = ({ notification ,direct }) => {
    console.log("ooooo",notification)
    
    let when = notification.created_at || "Just now"

    return (
        <div className="notic-card">
            <div className="notic-icon">
                🔔
            </div>
            <div className="notic-content">
                <p>{notification.msg}</p>
                <span>{when}</span>
            </div>
            <Link to={direct}>see</Link>
        </div>
    );
};


function Notificationpage(prop) {
    const navi  = useNavigate()
    const [others ,setOthers ]  = useState([])

    useEffect(()=>{
        const all_noti = prop.Notification.current.data ||[]
    
        console.log(all_noti)
  
        setOthers(all_noti)

        return()=>{
            const send_seen = async()=>{
              try {
                        const res = await getAPI('protectedApi/noti_seen','GET',true)
            
                        if(res.success){
                            console.log(res);
                        }
                        else{
                            throw new Error("access denied pls try again");
                        }
            
                } catch(error) {
                    console.error("Error:", error);
                }
            }
            prop.setNoti_length(0)
            send_seen(true)
        }
           
    },[])

    return (
        <div className="notification-page">

            <div className="notification-header">
                <h1>Notifications</h1>
                <button onClick={()=> navi('/')}>Back</button>
              
            </div>


                <section className="notification-section">


                    <div className="notification-list">
                        {others.map((not , indx) => (
                            <NoticCard
                                key={indx}
                                notification={not}
                                direct = {not.type==="Swap Request"? '/myList' :'/Final' } 
                            />
                        ))}
                    </div>

                </section>
         

        </div>
    );
}

export default Notificationpage;