import './upgrade.css'
import ProfCard, { Loading, UpgradeCard } from './ProfCard'
import { useRef, useState } from 'react';
import { getAPI, mthdAPI } from '../controlers';
import { useEffect } from 'react';



function Upgrade(prop){
    const user = prop.user_info.current.data
    const [isLoadingg ,setIsLoadingg] = useState(false)
    console.log("????????",user)
    const [role , setRole]= useState("")
    const desc = useRef(null);
    const [userRequest , setUserRequest]= useState([])
    const [issent , setIssent]= useState(false)
    
    
    const roleOptions = {
  

        local_community_representative: [
            {
                value: "business",
                label: "Business",
            },
            {
                value: "local_community_member",
                label: "Local Community Member",
            },
        ],

        local_community_member: [
            {
                value: "business",
                label: "Business",
            },
        ],

        user: [
            {
                value: "business",
                label: "Business",
            },
            {
                value: "local_community_member",
                label: "Local Community Member",
            },
            {
                value: "local_community_representative",
                label: "Local Community Representative",
            },
        ],

        business: [
            {
                value: "local_community_member",
                label: "Local Community Member",
            },
            {
                value: "local_community_representative",
                label: "Local Community Representative",
            },
        ],
};


    
const snd_rqst = async()=>{
    setIsLoadingg(true)
    const description = desc.current.value;

    if(role === "" && description === ""){
        alert("Please select the option")
        return
    }
    console.log(prop.reqst.current)
    const ans = await mthdAPI('protectedApi/upReq',"POST",{role : role ,disc :description},true)
    console.log("idk......",ans)
    if(ans.success){
        prop.reqst.current.data= ans.data
        prop.reqst.current.check = false
        setIssent(true)
        

    }
    setIsLoadingg(false)


}

useEffect(()=>{
    
      console.log("naao paji",prop.reqst.current)
  if(!prop.reqst.current.check){
   
    return  
    }
    
    const initil_fun = async()=>{
        setIsLoadingg(true)
        const ans =  await getAPI('protectedApi/sndreqst',"GET",true);
        console.log("yellow",ans.data.length)
        if(ans.success){
            prop.reqst.current.check = false
            console.log("",ans.data.length ,ans.data.length > 0)
           
            if(ans.data.length > 0){
                 console.log("yosha",ans)
                prop.reqst.current.data= ans.data
                setIssent(true)
            }
            
        }
         setIsLoadingg(false)

    }
    const  initil_fun_grant = async()=>{
        setIsLoadingg(true)
        const ans = await mthdAPI('protectedApi/grntreqst',"POST",{page : 0},true);
        console.log("tosha",ans)
         if(ans.success){
            prop.reqst.current.check = false
             prop.reqst.current.data = ans.posts
            setUserRequest(ans.posts)
        }
        setIsLoadingg(false)

    }
    if(["user", "business"].includes(user.role)){
    initil_fun()
    }else if(["admin","local_community_representative", "local_community_member"].includes(user.role)){
        initil_fun_grant()
    }
   

},[])



    /////////////
    return(
      <div className="up_parent">
    
    {["user", "business"].includes(user.role)&&
    <div className="up_content">
        {isLoadingg?<Loading/>:
        <>
         <div className="rqsts_header">
        <h2>Account Types & Roles</h2>
        <p>Understand account permissions and available upgrades.</p>
         </div>
         {console.log("........",issent)}
        {issent ?
        <UpgradeCard user_info={user} reqst={prop.reqst} />:
         <div className="rqsts_selct">
            <div className="slct">
                <label htmlFor="role">Role:</label>

                <select name="role" id="role"
                onChange={(e)=>{setRole(e.target.value)}}
                defaultValue="">
                    <option value="" disabled>
                        Select a role
                    </option>

                    {(roleOptions[user.role] || []).map((role) => (
                        <option key={role.value} value={role.value}>
                            {role.label}
                        </option>
                    ))}
                </select>
                </div>
        <textarea
            name="reason"
            ref={desc}
            placeholder="Explain why you want to upgrade your account..."
            rows={4}
        />

        <button onClick={()=>snd_rqst()}>Upgrade</button>
        </div>
        }
        </>
        }
        
<div className="rqsts_contnr2">
   

    <div className="role_list">
        <div className="role_item">
            <div className="role_title">
                <h3>User</h3>
                <span>Default</span>
            </div>
            <p>Regular account for individuals in the community.</p>
            <ul>
                <li>Post personal work and service requests.</li>
                <li>Browse local jobs, events, advertisements and alerts.</li>
                <li>Like and save posts.</li>
                <li>Request an account role upgrade.</li>
            </ul>
        </div>

        <div className="role_item">
            <div className="role_title">
                <h3>Business</h3>
                <span>Business</span>
            </div>
            <p>For local shops, service providers and businesses.</p>
            <ul>
                <li>Publish job vacancies.</li>
                <li>Post up to one advertisement, according to platform rules.</li>
                <li>Promote local products and services.</li>
                <li>Manage business-related posts.</li>
            </ul>
        </div>

        <div className="role_item">
            <div className="role_title">
                <h3>Local Community Member (LCM)</h3>
                <span>Community</span>
            </div>
            <p>For members who actively participate in their local community.</p>
            <ul>
                <li>Post community events and meetings.</li>
                <li>Share local alerts and other community notices.</li>
                <li>Help circulate useful local information.</li>
            </ul>
        </div>

        <div className="role_item">
            <div className="role_title">
                <h3>Local Community Representative (LCR)</h3>
                <span>Representative</span>
            </div>
            <p>For approved representatives who help maintain reliable local information.</p>
            <ul>
                <li><b>Single person/account per one Locality.</b></li>
                <li>Publish community events, alerts and notices.</li>
                <li>Validate local information and community posts.</li>
                <li>Help maintain trustworthy information for their locality.</li>
                <li>Review and grant eligible role upgrades, if authorized.</li>
                
            </ul>
        </div>

        
    </div>

    <div className="role_note">
        <strong>Important</strong>
        <p>
            Role upgrades are subject to approval and authorization.
            Available permissions depend on the account role assigned
            by the platform.
        </p>
    </div>
</div>

    </div>
    }



    {[
        "admin",
        "local_community_representative",
        "local_community_member",
    ].includes(user.role) && (
        <div className="grant_content">
            <h2>Upgrade Requests</h2>
              
            {userRequest.length !==0 ?
            <div className="rqsts_contnr">
               {
                userRequest.map((usr, idx) => {
                    return (
                      <ProfCard key={idx}   user={usr} setUserRequest ={setUserRequest} />

                    )


                })
                    
                    
               }
            </div>:
            <h3>No upgrade request is present</h3>
            }
        </div>
    )}
    </div>
    )
}


export default Upgrade;

/////////////////




