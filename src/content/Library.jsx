
import { useEffect, useState } from "react";
import "./Library.css";
import Post_cards from "./Cards";
import { getAPI ,mthdAPI} from '../controlers';
import { Loading } from "./ProfCard";



function Library(prop) {
    const { savedpst, likedpst ,mypst} = prop;
    const [activeTab, setActiveTab] = useState("saved");
    const arrRef = { saved :savedpst , liked : likedpst ,mypst:mypst};
     const [isLoadingg ,setIsLoadingg] = useState(false)
    const [dsplyPosts , setDsplyPosts] = useState()
    console.log("><><><><><><><><",savedpst , likedpst, mypst)


    const getPosts = async (postRef, endpoint ) => {
        setIsLoadingg(true);
        console.log("vvvvvvvvv",endpoint)
        console.log(postRef.current)
        
    
            
        const jsend = {page :postRef.current.page.no}

        if (!postRef.current.check) {
            setDsplyPosts(postRef.current.data);
            setIsLoadingg(false);
            console.log("vvvvvvvvv",endpoint)
            console.log(postRef.current)
            return;
        }

        if(!postRef.current.page.isnext ){
            alert("there is no more posts")
            postRef.current.check = false;
            return
        }
        
        
        const dataE =await mthdAPI(endpoint,'POST',jsend, true)
        console.log(endpoint ,"ans:  " ,dataE)

        if (dataE.success) {
            postRef.current.data = dataE.posts;
            postRef.current.page.isnext = dataE.isnext
            postRef.current.check = false;
            console.log(dataE.posts)
            setDsplyPosts(dataE.posts);
            console.log("vvvvvvvvv",endpoint)
            console.log(postRef.current)
        }

        setIsLoadingg(false);
        };


     

   

    useEffect(()=>{
        console.log("loading...")
         getPosts(likedpst,'protectedApi/get_liked')
    },[])
    useEffect(()=>{
        console.log("loading...")
         getPosts(savedpst,'protectedApi/get_saved')
         setDsplyPosts(prop.savedpst.current.data);

    },[])
    useEffect(()=>{
        console.log("loading...")
         getPosts(mypst,'protectedApi/get_mypst')
         console.log(prop.mypst.current)

    },[])


   

    return (
        <div className="Library">
            <div className="Library-tabs">
                <div
                    className={`Library-tab ${
                        activeTab === "mypst" ? "Library-active" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("mypst")
                        setDsplyPosts(prop.mypst.current.data);
                        }}
                >
                    My Posts
                </div>
                <div
                    className={`Library-tab ${
                        activeTab === "saved" ? "Library-active" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("saved")
                        setDsplyPosts(prop.savedpst.current.data);
                        }}
                >
                    SAVES
                </div>
                


                <div
                    className={`Library-tab ${
                        activeTab === "liked" ? "Library-active" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("liked")
                         setDsplyPosts(prop.likedpst.current.data);
                        }}
                >
                    LIKES
                </div>
            </div>
             { isLoadingg ?<Loading/> :        
            <div className="Library-content">
              
            
                {dsplyPosts?.map((item, indx) => (
                     
                    <Post_cards
                        post_info={item}
                        user_info={prop.user_info}
                        arrRef={arrRef?.[activeTab]}
                        all_Cmnt={prop.all_Cmnt}
                        key={item.id ?? indx}
                        savedpst={prop.savedpst} likedpst={prop.likedpst}
                    />
                ))}
                 {
                arrRef[activeTab].current.page.isnext &&
                    <button onClick={()=>{
                    arrRef[activeTab].current.check = true
                    arrRef[activeTab].current.page.no = arrRef[activeTab].current.page.no +1
                    getPosts( arrRef[activeTab], `protectedApi/${activeTab}`)

                }} >Next</button>
                }
                {
                arrRef[activeTab].current.page.no >1 &&
                    <button onClick={()=>{
                    arrRef[activeTab].current.check = true
                    arrRef[activeTab].current.page.no = arrRef[activeTab].current.page.no - 1
                    getPosts( arrRef[activeTab], `protectedApi/${activeTab}`)

                }} >Back</button>
                }
            </div>
                }
        </div>
    );
}

export default Library;
