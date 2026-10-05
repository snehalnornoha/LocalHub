import { Bell, Search } from 'lucide-react';
import  './Home.css'
import { useState ,useEffect} from 'react';

 const categories = [
    "Explore",
    "Jobs",
    "Events",
    "Alerts",
    "Advertisements",
    "PublicNotices"
  ];

function Ahome(props){
    const [activeCategory, setActiveCategory] = useState("Explore");
    
 
    return(
        <div className="home_parent">
            <div className="header">
            <div className="search_bar">
                <Search/>
                <input type="text" placeholder=' Search' />
            </div>
            <Bell/>
            </div>
            <div className="catogory">
               {categories.map((cat,indx) =>
               <button key={indx} 
               className={activeCategory === cat ? "active-cat" : "in-active-cat"}
                onClick={()=>setActiveCategory(cat)} >
                {cat}</button>
            )}
                 
               
            </div>

            <div className="home_content">



                
            </div>
            
        </div>
    )
}

export default Ahome;