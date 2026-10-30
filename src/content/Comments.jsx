import "./Comments.css";
import profile from '../assets/profile.jpg'
import { useRef, useState } from "react";
import { mthdAPI } from "../controlers";
import {  Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Loading } from "./ProfCard";

function Cmnt_card({ cmnt ,post_id, user_id ,postCmnt ,setComments}) {
    console.log(postCmnt)
    const okdelete = async(cmnt_id ,post_id)=>{
        const confirmed = confirm("Delete this comment?");
        if (!confirmed) {
            return 0;
           
        }
        const jsned = {cmnt_id:cmnt_id ,post_id :post_id}
        console.log(jsned)
        //backsend 
        const ans = await mthdAPI(`protectedApi/cmnt`,"DELETE",jsned,true)
        if(ans.success){
            const rmaining = postCmnt.current.data.filter((cht)=>cht.id !== cmnt_id )
            postCmnt.current.data = rmaining
            setComments(rmaining)
            
        }
         
    }
    return (
        <div className="cmnt_card">
            <div className="cmnt_user">
                <img src={cmnt.user_info?.img|| profile} alt="profile" />
                <span>@{cmnt.user_info?.name}</span>
                
            </div>

            <div className="cmnt_text">
                {cmnt.text}
            </div>
            {cmnt.user_id === user_id &&<button onClick={()=>okdelete(cmnt.id , post_id)} className="delete"><Trash2/></button>}
        </div>
    );
}

export default function Comment({ cmnts,setIscmnt ,info_cmnt ,user_id ,all_Cmnt}) {
    const [comments ,  setComments] = useState(cmnts)
    const [cmntloading , setCmntloading ] = useState(false)
    const [sedingCmnt , setSedingCmnt] = useState(false)
    console.log("jsned", info_cmnt ,user_id)
    const postCmnt  = useRef(null)
    const [msg_text,setMsg_text] = useState("")
     const onClose  = ()=>{
        setIscmnt(false)
    }
    const okSend  = async(msg)=>{
        setSedingCmnt(true)
        const jsned = {msg : msg , ...info_cmnt}
        console.log(jsned)
        //backsend 
        const ans = await mthdAPI(`protectedApi/entrCmnt`,"POST",jsned,true)
        if(ans.success){
        const after_add = [...comments , ans.data]
        setComments(after_add)
        postCmnt.current.data = after_add

        
        setSedingCmnt(false)
        }
         
    }
    
    useEffect(()=>{
        setCmntloading(true)
        console.log(all_Cmnt.current)
        const ans1 = all_Cmnt.current.data.find((itm)=> itm.id === info_cmnt.post_id)
        postCmnt.current =ans1

        if(ans1){ 
            console.log("no paji already cmnts loaded",ans1)
            setCmntloading(false)
            setComments(ans1.data)
            return
        }
        const  find_cmnts = async()=>{
            const ans2 = await mthdAPI(`protectedApi/getCmnts`,"POST",{post_id :info_cmnt.post_id},true)
            console.log("<<<<<<<<<<<<",ans2)
            if(ans2.success){
                console.log("comnts" , ans2.comnts)
                all_Cmnt.current.data.push({id : info_cmnt.post_id , data :ans2.comnts })
                setComments(ans2.comnts )
                setCmntloading(false)
                const ans1 = all_Cmnt.current.data.find((itm)=> itm.id === info_cmnt.post_id)
                postCmnt.current =ans1

            }
            else{ alert('failed to load...')}

        }
         find_cmnts()
        

    },[])

    return (
        <div className="comment_panel">
            <div className="comment_header">
                <span>Comments</span>
                <button onClick={()=>onClose()}>×</button>
            </div>
            {cmntloading?<Loading/> :
            <>
                <div className="comments_list">
                    {comments.map((cmnt , indx) => (
                        <Cmnt_card key={indx} cmnt={cmnt} user_id ={user_id }  post_id={info_cmnt.post_id}  postCmnt={postCmnt} setComments={setComments} />
                    ))}
                    {sedingCmnt &&<Loading/>}
                </div>       
                <div className="chat-input">
                <input  type="text" placeholder="Type a message..."onChange={(e)=>setMsg_text(e.target.value)} />
                {!sedingCmnt && <button onClick={() => okSend(msg_text) }>➤</button>}
                </div>
            </>
            }
            
        </div>
    );
}