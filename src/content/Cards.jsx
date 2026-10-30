import './Cards.css'
import profile from '../assets/profile.jpg'
import app_logo from '../assets/zoro.png'
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import { mthdAPI } from '../controlers';
import { useState } from 'react';
import Comment from './Comments';



export function Post_cards({post_info ,user_info ,arrRef ,all_Cmnt,savedpst ,likedpst}){
    console.log("wht",post_info)
    console.log(savedpst ,likedpst)
    const [isLike_loading , setIsLike_loading] = useState(false)
 
    const [isSave_loading , setIsSave_loading] = useState(false)
    const [iscmnt, setIscmnt] = useState(false)
    const [comments , setComments] = useState([{name : "lolo " ,text : "hiiiiiii"},{name : "lolo " ,text : "hiiiiiii"},{name : "lolo " ,text : "hiiiiiii"},{name : "lolo " ,text : "hiiiiiii"},{name : "lolo " ,text : "hiiiiiii"},{name : "lolo " ,text : "hiiiiiii"}])
    const user = user_info.current.data
   
    const handleComment = () => {
        console.log("Comment clicked");
        setIscmnt(true)
    };

    const handleLike  = async () => {
        console.log("Bookmark clicked");
        setIsLike_loading(true)
        const jsend = {liked_id : post_info.id}
        const ans = await mthdAPI('protectedApi/like',"PUT",jsend , true)
        if(ans.success){
            post_info.likes = ans.counts
            const post = arrRef.current.data.find(
                item => item.id === post_info.id
            );

            if (post) {
                post.likes = ans.counts;
            }
            
          
          likedpst.current.check = true                         
        likedpst.current.page.isnext = true 
          
        }    
        setIsLike_loading(false)     
                                
    };

    const handleSaves = async() => {
        setIsSave_loading(true)
          console.log("Bookmark clicked");
        const jsend = {saved_id : post_info.id}
        const ans = await mthdAPI('protectedApi/save',"PUT",jsend , true)
        if(ans.success){
             post_info.saves = ans.counts
            const post = arrRef.current.data.find(
                item => item.id === post_info.id
            );

            if (post) {
                post.saves = ans.counts;
            }
            console.log(ans)
            savedpst.current.check = true                         
        savedpst.current.page.isnext = true    
        }    
        setIsSave_loading(false) 
        console.log(" like save",arrRef.current.data[1].likes,arrRef.current.data[1].saves)
    };
    console.log("img",post_info.profile_image_url === 'null')
    const prof_img = post_info.profile_image_url === 'null'? profile :post_info.profile_image_url
  
        

    return(
      
        <div className="pcard Advert">
        
            <div className="prof_container">
                <img src={prof_img} alt="profile_img" />
                <span>
                <h2>{post_info.name}</h2>
                <p className= {post_info.acc_type}>{post_info.acc_type}</p>
            </span>
            

            </div>
            <div className="line"></div>
            <div className="pcard_desc">
                <h3>{post_info.title}</h3>
                <p>{post_info.description}</p>
            </div>
            <div className="content">
            <span className={post_info.type}>{post_info.type}</span>
            <img src={post_info.image_url} alt="app_logo" />
            {iscmnt && <Comment cmnts= {comments} info_cmnt={ {name: user.name,img :user.profile_image_url,post_id : post_info.id }} all_Cmnt={all_Cmnt} user_id = {user_info.current.data.id} setIscmnt = {setIscmnt} />}
           
            </div>
             <div className="btns">
                <MessageCircle onClick={()=>{handleComment()}}/>{post_info.comments}
                {isSave_loading?<><Bookmark /> {'..'}</>:<><Bookmark  onClick={()=>{handleSaves()}}/>{post_info.saves}</>}
                {isLike_loading ?<><Heart />{'..'}</> :<><Heart  onClick={()=>{handleLike()}}/>{post_info.likes}</>}
            </div>
       

            
        </div>
    )

}        
export default Post_cards;