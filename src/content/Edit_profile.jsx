import { useActionState ,useState} from 'react';
import './Edit_profile.css';
import { useEffect } from 'react';
import profile_img from "../assets/profile.jpg";
import imageCompression from 'browser-image-compression';
import { useNavigate} from 'react-router-dom';
import { mthdAPI ,refresh_credentials} from '../controlers';
const API_URL = import.meta.env.VITE_OTHER_SIDE_PATH;

const options = {
  maxSizeMB: 1,             // Maximum size
  maxWidthOrHeight: 1920,   // Resize large images
  useWebWorker: true,       // Compress in a Web Worker
  initialQuality: 0.8,      // JPEG/WebP quality
};


const send_updated_profile = async(data,one_time_refresh)=>{
    const ans = await mthdAPI('protectedApi/edit_profile',"PUT",data,true)
    if(ans.success){
        return ans;
    } else { throw new Error(`Profile update failed: ${res.status}`)}
}


async function updateProfile(previousState, formData) {

const name = formData.get("name");
const country = formData.get("country");
const state = formData.get("state");
const district = formData.get("district");
const taluk = formData.get("taluk");
const locality = formData.get("locality");
const user_info =JSON.parse(formData.get("user_info"));
let location = false;

if (state === "" ||district === "" ||taluk === "" ||locality === ""|| country===""){
  return alert("Please enter the location");
}

if (state !== user_info.location.state ||district !== user_info.location.district ||
  taluk !== user_info.location.taluk ||locality !== user_info.location.locality|| country!==user_info.location.country) 
  {
  location = {

    country :user_info.location.country !== country ? country  :user_info.location.country,
    state: user_info.location.state !== state? state: user_info.location.state,
    district: user_info.location.district !== district? district: user_info.location.district,
    taluk: user_info.location.taluk !== taluk? taluk: user_info.location.taluk,
    locality: user_info.location.locality !== locality? locality: user_info.location.locality
  };
}





 try{

    const data = {
    ...(user_info.name !== name && { name }),
    ...(location && {location}),
    };
    console.log("----------><",data)
    if(Object.hasOwn(data, "")){return alert("dont leave the fields empty")};
    

    if(Object.keys(data).length > 0) {  
      
      const ans = await send_updated_profile(data,true)

      
      return ans;
  
      


    }
    else{return  alert("Change the filds to update")}
  }
 catch(error){
      console.log("501 server error")

  }
}


function Edit_profile(prop) {
  let user_info =prop.user_info.current.data

  const [state, formAction, isPending] = useActionState(updateProfile , null);
  const [is_prof_edit ,setIs_prof_edit] = useState(false)
  const [prof_change_img ,setProf_change_img ] = useState(null)
  const [isLoadingg ,setIsLoadingg] = useState(false)
  const navi = useNavigate()

  const profileIMGchage = (e)=>{
    setProf_change_img(e.target.files[0])
  }
  const update_image = async(is_refresh)=>{

      setIsLoadingg(true)
      const snd_data = new FormData()
      if(prof_change_img.length===0){alert("select the image to change the profile");return}
      const compressed = await imageCompression(prof_change_img, options);
      snd_data.append("images",compressed)
      snd_data.append("imgurl" , user_info.profile_image_url)


    
      try{
                            
        const res = await fetch(`${API_URL}/protectedApi/updtprofimg`, {
            method: "PUT",
            credentials: "include",
            body : snd_data

        });
            if (res.ok) {
                const data = await res.json()
                prop.user_info.current.data.profile_image_url   = data.imgurl
                user_info.profile_image_url   = data.imgurl
                console.log(data.imgurl)
                setIsLoadingg(false)
              
                
                }
                
        
        else if (res.status === 401 && is_refresh) {
                    const refreshed = await refresh_credentials();
        
                    if (refreshed.success) {
                        console.log("hi token rfreshed ")
                        return update_image(false);
                    }
                }
        else{
                throw new Error(`Request failed: ${res.status}`);
                }

                
                
            }
                
      catch(err){
          alert(err)
      }
          
  }
  useEffect(()=>{
    console.log("===========",user_info)

  },[user_info])
  useEffect(()=>{
    console.log("isloading" , isPending , state)
    if(state !==  null){
      prop.user_info.current.check = true
      prop.setPagerefresh(!prop.pagerefresh)
      if(prop.setIn_c_profile !== "undefined"){
      prop.setIn_c_profile(true)
      }
      navi(`/`)
      
      
    }

  },[state])

  const changePassword = ()=>{
    navi('/reset')

  }

  const go_back = () =>{
    console.log("LAAALLA",prop.user_info.current.data.location.length)
    if(user_info.location.state ==="" || user_info.location.pin === "" || user_info.location.country==="" || Object.keys(user_info.location).length === 0)
      {return alert("please enter the location")}
    console.log(user_info)
    if(prop.setIn_c_profile !== "undefined"){
                prop.setIn_c_profile(true)
                }
                navi(`/`)
  
 

    

  }

  return (
    <div className="edit-profile-page">

      {/* Header */}
      <div className="edit-profile-header">
        <p className="page-breadcrumb">Account / Settings</p>
        <h1>Edit Profile</h1>
        <p>Update your personal information and profile details.</p>
      </div>


      {/* Top Cards */}
      <div className="profile-top-section">

        {/* Profile Card */}
        <div className="profile-card">

          <div className="profile-image-wrapper">
            {isLoadingg ? <p>loading</p>:
            <>
              <img
                src={user_info?.profile_image_url ||profile_img}
                alt="Profile"
                className="profile-image"
              />

              <button onClick={()=>{setIs_prof_edit(true)}} className="change-image-btn">
                ✎
              </button>
              {is_prof_edit &&
                <div className="change-image-form">
                  <h3>Change Profile Image</h3>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={profileIMGchage}
                  />
                  <button className="sndprofile"onClick={()=>{update_image(true)}} type="button">Send</button>
                  <button type="button" onClick={()=>{setIs_prof_edit(false)}}>Cancel</button>
              </div>
              }
            </>
              }
          </div>


          <div className="profile-details">
            <h2>{user_info?.name}</h2>
            <p className="profile-role">{user_info.role}</p>
          </div>

          <div className="profile-stats">

           

          </div>

        
        </div>



        {/* Security Card */}
        <div className="security-card">

          <div className="security-icon">
            🔒
          </div>

          <div className="security-content">
            <h2>Change Password</h2>

            <p>
              Keep your account secure by regularly updating your password.
            </p>

            <button onClick= {()=>changePassword()} className="password-btn">
              Change Password →
            </button>
          </div>

        </div>

      </div>


      {/* Personal Information */}
      <div className="profile-form-card">

        <div className="section-heading">
          <h2>Personal Information</h2>
          <p>Keep your profile information up to date.</p>
        </div>


        <form action={formAction}>

          {/* Name + Email */}
          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                defaultValue={user_info?.name}
                name='name'
              />
            </div>


           
          </div>


          {/* Location */}
          <div className="form-group">

            <label>Location</label>

            <div className="location-grid">
              <div>
                <label className="sub-label">Country</label>

                <input
                  type="text"
                  placeholder="Enter Country"
                  defaultValue={user_info?.location?.country}
                  name="country"
                />
              </div>
              <div >
                <label className="sub-label">State</label>

                <input
                  type="text"
                  placeholder="Enter state"
                  defaultValue={user_info?.location?.state}
                  name="state"
                />
              </div>



              <div>
                <label className="sub-label">District</label>
                

                <input
                  type="text"
                  placeholder="Enter district"
                  defaultValue={user_info?.location?.district}
                  name="district"
                />
              </div>
              <div>
                <label className="sub-label">Taluk</label>
                

                <input
                  type="text"
                  placeholder="Enter taluk"
                  defaultValue={user_info?.location?.taluk}
                  name="taluk"
                />
              </div>
              <div>
                <label className="sub-label">locality</label>
                

                <input
                  type="text"
                  placeholder="Enter locality"
                  defaultValue={user_info?.location?.locality}
                  name="locality"
                />
              </div>

            </div>

          </div>

        
          {/* Buttons */}
          {isPending? ( <p>"updating...." </p>):
          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={()=>go_back()}
            >
              Back
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>
              }
          <input type="hidden" name="user_info" value={JSON.stringify(user_info)} />

        </form>

      </div>

    </div>
  );
}

export default Edit_profile;