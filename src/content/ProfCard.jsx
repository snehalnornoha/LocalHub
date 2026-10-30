
import { useNavigate } from "react-router-dom";
import { mthdAPI } from "../controlers";
import "./ProfCard.css";
import { Trash2, MapPin, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useState } from "react";


export default function ProfCard({ user ,setUserRequest }) {
   const [isLoadingg ,setIsLoadingg] = useState(false)

   
    const onGrant = async(id)=>{
      setIsLoadingg(true)
      const jsend = {upid:id , wrole: user.wanted_role , decsn : true ,user_id : user.user_id }
      const ans = await mthdAPI('protectedApi/grntup',"PUT",jsend,true )
      if(ans.success){
        setUserRequest(prev => prev.filter(p => p.id !== id));
      }
       setIsLoadingg(false)
    }
    const onDecline = async(id)=>{
       setIsLoadingg(true)
       const jsend = {upid:id , wrole : user.wanted_role , decsn : false ,user_id : user.user_id}
       const ans = await mthdAPI('protectedApi/grntup',"PUT",jsend,true )
       if(ans.success){
        setUserRequest(prev => prev.filter(p => p.id !== id));
      }
       setIsLoadingg(false)

    }
    if(isLoadingg){
      return(<Loading/>)
    }{
    return (
        <div className="ProfCard">
            <div className="ProfCard_header">
                <div className="ProfCard_avatar">
                    {user.profile_image_url ? (
                        <img
                            src={user.profile_image_url}
                            alt={user.name}
                        />
                    ) : (
                        <span>
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                    )}
                </div>

                <h3 className="ProfCard_username">
                    {user.name}
                </h3>

                <span className={user.role}>
                    {user.role?.replaceAll("_", " ")}
                </span>
            </div>

            <div className="ProfCard_info">
               

                <div className="ProfCard_details">
                    <p>
                        <span>Email</span>
                        <strong>{user.email || "Not provided"}</strong>
                        
                    </p>

                    <p>
                        <span>User ID</span>
                        <strong>{user.id || "Not provided"}</strong>
                    </p>

                   
                        <p>
                            <span>Location</span>
                            
                              <strong>  { user.locality},{"  "}
                                 {user.taluk },</strong>
                                <strong>   {user.district},</strong>
                               <strong>    {user.state},</strong>
                                      
                                        
                            
                        </p>
                  

                    <p className="role">
                        <span>Requested Role</span>
                        <strong className={user.wanted_role}>
                            {user.wanted_role?.replaceAll("_", " ") ||
                                "Not specified"}
                        </strong>
                    </p>
                 
                    

                </div>
            </div>

            <div className="ProfCard_actions">
                <button
                    type="button"
                    className="ProfCard_grant"
                    onClick={() =>onGrant(user.id) }
                >
                    Grant
                </button>

                <button
                    type="button"
                    className="ProfCard_decline"
                    onClick={() =>onDecline(user.id)}
                >
                    Decline
                </button>
            </div>
        </div>
    );
  }
}








export function UpgradeCard(prop) {
  const [isLoadingg ,setIsLoadingg] = useState(false)
  const navi = useNavigate()
  console.log("yyyyyyyy",prop.reqst.current)
 
  console.log(prop.reqst.current.data[0])
  const upgradeRequest = prop.reqst.current.data[0]
 
  const handleDelete = async(id) => {
    setIsLoadingg(true)
   
    console.log("Delete upgrade request:", id);
    const isans = confirm(`Dummy delete function called for request ${id}`);
    if(!isans){return}
    const jsend = {id:id}
    const ans = await mthdAPI('protectedApi/delup', 'DELETE', jsend, true)
    if(ans.success){
      prop.reqst.current.check = false
      prop.reqst.current.data = []
      navi('/')

    }
    setIsLoadingg(false)


  };
  
  if(isLoadingg){
    return(<Loading/>)
  }else{
    return (

      <div className="uPgrd-card">
        {/* Left section: Profile */}
        <div className="uPgrd-profile">
          <div className="uPgrd-status">
            <span className="uPgrd-statusDot"></span>
            {upgradeRequest?.status}
          </div>

          <div className="uPgrd-avatar">
            {prop.user_info.image ? (
              <img
                src={upgradeRequest?.image}
                alt={upgradeRequest?.name}
                className="uPgrd-avatarImage"
              />
            ) : (
              <span className="uPgrd-avatarInitial">
                {upgradeRequest?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h3 className="uPgrd-name">{upgradeRequest?.name}</h3>
          <span className="uPgrd-roleLabel">Your request</span>
        </div>

        {/* Right section: Request details */}
        <div className="uPgrd-details">
          {/* Account upgrade direction */}
          <div className="uPgrd-upgradePath">
            <div className="uPgrd-role">
            
              <span>{upgradeRequest?.role}</span>
            </div>

            <div className="uPgrd-arrow">
              <ArrowRight size={20} />
            </div>

            <div className="uPgrd-role uPgrd-targetRole">
              {upgradeRequest?.wanted_role}

            </div>
          </div>

          {/* Description */}
          <div className="uPgrd-descriptionBox">
            <span className="uPgrd-sectionLabel">REQUEST DESCRIPTION</span>
            <p className="uPgrd-description">
              {upgradeRequest?.reason}
            </p>
          </div>

          {/* Location */}
          <div className="uPgrd-location">
            <MapPin size={18} className="uPgrd-locationIcon" />
            <div className="uPgrd-locationText">
              <span className="uPgrd-sectionLabel">LOCATION</span>
              <span className="uPgrd-locationValue">
                State : {upgradeRequest?.state} 
              </span>
              <span className="uPgrd-locationValue">
                District :{upgradeRequest?.district}
              </span>
              <span className="uPgrd-locationValue">
              Taluk :{upgradeRequest?.taluk}
              </span>
            </div>
          </div>
        </div>

        {/* Delete request button */}
            
        <button
          type="button"
          className="uPgrd-deleteButton"
          onClick={() => handleDelete(upgradeRequest?.id)}
          aria-label="Delete upgrade request"
          title="Delete request"
        >
          <Trash2 size={18} />
        </button>

        
      </div>
    );
  }
}

export function Loading(){

    return(
        <div className="loader_div">
        <span className="loader"></span>
        Loading ....
        </div>
    )
    
}