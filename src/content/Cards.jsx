import './Cards.css'
import profile from '../assets/profile.jpg'
import app_logo from '../assets/zoro.png'
import { Bookmark, Heart, MessageCircle } from 'lucide-react';

export function Post_cards(){

    return(
        <div className="pcard">
            <div className="prof_container">
                <img src={profile} alt="profile_img" />
                <span>
                <h2>{"Snehal"}</h2>
                {"Business"}
            </span>
            

            </div>
            <div className="line"></div>
            <div className="pcard_desc">
                <h3>MISA CAPE</h3>
                <p>ou cape is good and and and good kjbnkjnkkkk   kjbkjbkj lkkjlklklk kkkkkkkkkkkkkkkk kjbkjnkjjnk  kjbkjnbkjnkjn very good</p>
            </div>
            <div className="content">
            <span>Advertisements</span>
            <img src={app_logo} alt="app_logo" />
           
            </div>
             <div className="btns">
                <MessageCircle/>
                <Bookmark/>
                <Heart/>
            </div>
            

            
        </div>
    )
}
export default Post_cards;