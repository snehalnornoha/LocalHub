import './Cards.css'
import profile from '../assets/profile.jpg'
import app_logo from '../assets/zoro.png'
import { Bookmark, Heart, MessageCircle } from 'lucide-react';

export function Post_cards({post_info}){

    return(
        <div className="pcard Advert">
            <div className="prof_container">
                <img src={post_info.profile_image_url || profile} alt="profile_img" />
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
           
            </div>
             <div className="btns">
                <MessageCircle/>{post_info.comments}
                <Bookmark/>{post_info.saves}
                <Heart/>{post_info.likes}
            </div>
            

            
        </div>
    )
}
export default Post_cards;