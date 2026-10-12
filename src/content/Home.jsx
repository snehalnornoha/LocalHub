import { Bell, Search } from 'lucide-react';
import  './Home.css'
import { useState ,useEffect} from 'react';
import Post_cards from './Cards';
import Edit_profile from './Edit_profile';
import { getAPI ,mthdAPI} from '../controlers';
 const categories = [
    "Explore",
    "Jobs",
    "Events",
    "Alerts",
    "Advertisements",
    "PublicNotices"
  ];

  



function Ahome(prop){
    const [activeCategory, setActiveCategory] = useState("Explore");
    const [in_c_profile , setIn_c_profile ] = useState(prop.isedit)
    const [pagerefesh ,setPagerefresh ] = useState(false)
    const [isLoadingg ,setIsLoadingg] = useState(false)
    const [dsplyPosts , setDsplyPosts] = useState([])
    console.log("///",prop.isedit)
   const arrRef = {
    Explore: prop.Explore,
    Jobs: prop.Jobs,
    Events: prop.Events,
    Alerts: prop.Alerts,
    Advertisements: prop.Advertisements,
    PublicNotices: prop.PublicNotices
    };


    useEffect(()=>{
        console.log("vvvvvvvvv",dsplyPosts)
    },[dsplyPosts])
    ////////////////////////////////////////////////////////////////////////////
    const getPosts = async (postRef, endpoint ) => {
        setIsLoadingg(true);
         console.log("vvvvvvvvv")
        console.log(postRef.current)
        
       
            
        const jsend = {page :postRef.current.page.no}

        if (!postRef.current.check) {
            setDsplyPosts(postRef.current.data);
            setIsLoadingg(false);
            return;
        }

        if(!postRef.current.page.isnext ){
            alert("there is no more posts")
            postRef.current.check = false;
            return
        }
        
        
        const dataE =await mthdAPI(endpoint,'POST',jsend, true)

        if (dataE.success) {
            postRef.current.data = dataE.posts;
            postRef.current.page.isnext = dataE.isnext
             postRef.current.page.no = postRef.current.page.no +1
            postRef.current.check = false;
            console.log(dataE.posts)
            setDsplyPosts(dataE.posts);
        }

        setIsLoadingg(false);
        };


    useEffect(()=>{
        console.log("ima in get userinfo",prop.user_info.current.check)
        if(!prop.user_info.current.check || !prop.isLogedin){console.log("no user_info check") ;return}
        const get_user_info = async()=>{
            console.log("--###-->",!prop.isLogedin)
           
        
        const data = await getAPI('protectedApi/get_user_info',"GET",true)
         console.log("\\\\\\\\\\",data);
            if(data.success){
                    prop.user_info.current.data = data.info[0]
                    prop.user_info.current.check = false
                    const loc = data.info[0].location
                    console.log("loccccccccc",data.info[0].location)
                    if(!loc.country || !loc.state || !loc.district || !loc.taluk || !loc.locality){
                        console.log("hey aagggggggggggggggggggggg")
                        setIn_c_profile(false);
                    }
                
            }
           
        }
        setIsLoadingg(true)
         get_user_info()
         setIsLoadingg(false)
         console.log("hih")
    },[pagerefesh])


    useEffect(()=>{
         const loc = prop.user_info.current?.data
        if(!in_c_profile)
        {
            console.log("no paji")
            return 
        }
        console.log("yes paji",prop.Explore.current.check)
        if(!prop.Explore.current.check){
            setDsplyPosts(prop.Explore.current.data);
            console.log("not Explore") ;  
            return};
        getPosts(prop.Explore,'protectedApi/Explore')

        

    },[pagerefesh])
    

    ///////////////////////////////////////////////////
    if(!in_c_profile){ 
        return(<Edit_profile setIn_c_profile ={setIn_c_profile} user_info = {prop.user_info} setPagerefresh = {setPagerefresh} pagerefresh = {pagerefesh }/> )
    }else{
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
               { 

               return(
               <button key={indx} 
               className={activeCategory === cat ? "active-cat" : "in-active-cat"}
                onClick={()=>{
                    setActiveCategory(cat)
                    getPosts( arrRef[cat], `protectedApi/${cat}`)

                }} >
                {cat}</button>)}
            )}
                 
               
            </div>
               
            <div className="home_content">

                {
                 dsplyPosts?.map((item , indx)=>{
                    console.log("this is the :",item)
                    return(
                        <Post_cards post_info= {item}  key={indx}></Post_cards>
                    )
                 })

                 }
                 <button onClick={()=>{
                    arrRef[activeCategory].current.check = true
                    getPosts( arrRef[activeCategory], `protectedApi/${activeCategory}`)

                }} >Next</button>
            </div>
              {dsplyPosts.length === 0 && 
              <>
              <h2>THERE IS NO POSTS </h2> 
              <h3>please try diffrent catogory</h3>
              </> }
            
        </div>
    )
}
}

export default Ahome;