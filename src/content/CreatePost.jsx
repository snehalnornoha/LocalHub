import { useState } from "react";
import "./CreatePost.css";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
const API_URL = import.meta.env.VITE_OTHER_SIDE_PATH;
import { mthdAPI, refresh_credentials} from '../controlers';
import { useNavigate } from "react-router-dom";
import { Loading } from "./ProfCard";


const options = {
  maxSizeMB: 1,             // Maximum size
  maxWidthOrHeight: 1920,   // Resize large images
  useWebWorker: true,       // Compress in a Web Worker
  initialQuality: 0.8,      // JPEG/WebP quality
};
const datafields = {
  type: "event",
  title: "Local Sports Day",
  state: "Karnataka",
  district: "Uttara Kannada",
  taluk: "Honnavar",
  description: "Annual sports event..."
};

function CreatePost(props) {
  const navi = useNavigate()
  const [image1, setImage1] = useState(null);
  const [img, setImg] = useState(null);
  console.log(props.user_info.current.data)
  const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm({
                                                                            defaultValues: datafields,
                                                                          });

  const handleImage = (e, setImage) => {
    const file = e.target.files[0];
    setImg(file)

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const hndl_crt = async(frmdata,img,user_img_url,is_refresh)=>{
    console.log(frmdata)
    const uname = props.user_info.current.data.name || user
    try{
    const cmprsd_img =  await imageCompression(img, options);
    const pst_send = new FormData()
    console.log("images is ok MM")
    pst_send.append("images",cmprsd_img );
    pst_send.append("name",uname );
    pst_send.append("user_img_url",user_img_url);
    Object.entries(frmdata).forEach(([key , value])=>{
      console.log(key,value)
      pst_send.append(key , value)
    })
   console.log("sending to",API_URL)
   const data123 = await mthdAPI('protectedApi/post_upload',"POST",{b : "ijnhh"},true)
   console.log(data123)
   
    const res = await fetch(
      `${API_URL}/protectedApi/post_upload`,
      {
        method: "POST",
        credentials: "include",
        body: pst_send
      }
    );
    console.log(res.ok)
    console.log("comppllted")
    const data = await res.json();
    if(res.ok){
      alert("your post sent successfully")
      props.Explore.current.check= true
      props.Explore.current.page.isnext= true
      navi('/')
      
   
    }
    else if (res.status === 401 && is_refresh) {
        const refreshed = await refresh_credentials();

        if (refreshed.success) {
            console.log("hi token rfreshed ")
            return hndl_crt(frmdata,img,user_img_url,false);
        }
    }
    else if (res.status === 409){
      alert(data.error)
         
     }
    
    else{
    throw new Error("something went wrong please retry again")
    }

    }

  catch (error) {
  console.error(error);
  alert(error)
  }
  

  }
  return (
    <div className="create-post-page">

      <div className="create-post-header">
        <p className="breadcrumb">Home / Create Post</p>
        <h1>Create Post</h1>
        <p>Share something useful with your local community.</p>
      </div>

      <form className="create-post-form"   onSubmit={handleSubmit((formData) => hndl_crt(formData, img, props.user_info.current.data.profile_image_url,true))}>

        {/* Images */}
        <div className="form-section">
          <h2>Post Images</h2>
          <p className="section-description">
            Add up to two images related to your post.
          </p>

          <div className="image-upload-container">

            {/* Image 1 */}
            <label className="image-upload-box">

              {image1 ? (
                <img src={image1} alt="Preview 1" />
              ) : (
                <div className="upload-placeholder">
                  <span>+</span>
                  <strong>Insert Image</strong>
                  <small>Click to upload</small>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e, setImage1)}
              />

            </label>

          </div>
        </div>


        {/* Type */}
        <div className="form-section">

          <label htmlFor="type" >Type</label>

          <select id="type" name="type" {...register("type")} >
            {/* Local Community Representative and Member */}
              {
                  ["local_community_representative", "local_community_member" ].includes(
                    props.user_info.current.data.role
                  ) && (
                    <>
                      <option value="job">Job</option>
                      <option value="work">Work</option>
                      <option value="event">Event</option>
                      <option value="alert">Alert</option>
                      <option value="meeting">Meeting</option>
                      <option value="notice">Other Notice</option>
                    </>
                  )}

                  {/* Business */}
                  {props.user_info.current.data.role === "business" && (
                    <>
                      <option value="job">Job</option>
                      <option value="work">Work</option>
                      <option value="advertisement">Advertisement</option>
                    </>
                  )}

                  {/* Normal user */}
                  {props.user_info.current.data.role === "user" && (
                    <option value="work">Work</option>
                  )}

                  {/* Admin */}
                  {props.user_info.current.data.role === "admin" && (
                    <>
                      <option value="job">Job</option>
                      <option value="event">Event</option>
                      <option value="alert">Alert</option>
                      <option value="meeting">Meeting</option>
                      <option value="notice">Other Notice</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="work">Work</option>
                    </>
                  )
              }
          </select>

        </div>


        {/* Title */}
        <div className="form-section">

          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter post title"
            {...register("title")}
          />

        </div>
        {/* State */}
        <div className="form-section">

          <label htmlFor="state">State :</label>

          <input
            type="text"
            id="state"
            name="state"
            placeholder="Enter post State"
              {...register("state")}
          />

        </div>
        {/* District*/}
        <div className="form-section">

          <label htmlFor="district">District</label>

          <input
            type="text"
            id="district"
            name="district"
            placeholder="Enter post district"
             {...register("district")}
          />

        </div>
        {/* Taluk */}
        <div className="form-section">

          <label htmlFor="taluk">Taluk</label>

          <input
            type="text"
            id="taluk"
            name="taluk"
            placeholder="Enter post taluk"
             {...register("taluk")}
          />

        </div>
        {/* Taluk */}
        <div className="form-section">

          <label htmlFor="taluk">Locality</label>

          <input
            type="text"
            id="taluk"
            name="taluk"
            placeholder="Enter post taluk"
             {...register("locality")}
          />

        </div>


        {/* Description */}
        <div className="form-section">

          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            rows="7"
            placeholder="Write the details of your post..."
              {...register("description")}
          ></textarea>

        </div>


        {/* Buttons */}
        <div className="form-actions">
          {!isSubmitting ?<>

              <button type="button" className="cancel-btn">
              
                Cancel
              </button>

              <button
              className="create-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
              
            </button>
        </>
         :
         <div>
         <Loading/>"Publishing..." 
         </div>
         }

        </div>

      </form>

    </div>
  );
}

export default CreatePost;