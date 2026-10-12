import { useActionState, useState,useEffect } from "react";
import "./forget_pass.css";
import { mthdAPI } from "../controlers";
const API_URL = import.meta.env.VITE_API_URL;

const OtpUrl =`api/send-otp`
const passUrl =`api/verify-otp`


async function verifyOTP(previousState, formData) {
  const email = formData.get("email");
  console.log("sending emial...");
  console.log("Email:", email);
  if(email.length === 0){
    return {success: "check the email is correct?" , email: email}

  }

  const data = await mthdAPI(OtpUrl,"POST",{email : email},true)
  if(data.success){
     return {isverified:true,success: data.message, email : email}
  }else{
        return {isverified:false ,success: data.msg , email : email}

  }

}





async function resetPassword(previousState, formData) {
  const email = formData.get("email");
  const pass = formData.get("pass");
  const cpass = formData.get("cpass");
  const otp = formData.get("otp");
  
  

  console.log("Reset password requested");
  console.log("Email:", email);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (pass !== cpass) {
    return {
      error: "Password and confirm password do not match",
      pass:pass,
    };
  }

  if (!passwordRegex.test(pass)) {
    return {
      error:"Minimum 8 characters, with uppercase, lowercase, number and special character",
      pass:pass
    };
  }
  console.log("->",otp.length)
  if(otp.length < 6){
    return {
      error: "check the otp please",
      pass:pass,

    };

  }

  console.log("Password validation passed");
    const data = await mthdAPI(passUrl,"POST",{email:email , password : pass , otp : otp},true)
    if(data.success){
      return {isvrfied: true, success: data.message};
    }else{
      return {isvrfied: false,error: data.message};

    } 
}

export default function ForgotPassword(props) {
  const [state, formAction, isPending] = useActionState(verifyOTP,null);

  const [data, form2Action, is2Pending] = useActionState(resetPassword,null);
 

  const [email, setEmail] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  useEffect(() => {
    console.log(state)
      
      if (state?.isverified) {
            alert(state.success)
          setIsOtpVerified(true);
      }
      alert(state?.message)
    }, [state]);
  useEffect(() => {
    console.log(">>>>",data)
      if (data?.isvrfied) {
          alert(data.success)
          props.setIsedit(false)
      }
    }, [data]);

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        {!isOtpVerified ? (
          <>
            <div className="forgot-header">
              <h2>Forgot Password?</h2>
              <p>
                Enter your email and we'll send you an OTP
                to reset your password.
              </p>
            </div>

              <form action={formAction} className="forgot-form">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  defaultValue={state?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                  className="primary-btn"
                  disabled={isPending}
                >
                
                  Send OTP
                </button>
                <button className="primary-btn" 
                 type="button"
                onClick={()=>props.setIsedit(false)}>Back</button>
                {isPending&& <p>loading</p>}


                
              </form>


            {state?.success && (
              <p className="success-message">
                {state.success}
              </p>
            )}
   
            
          </>
        ) : (
          <>
            <div className="forgot-header">
              <h2>Create New Password</h2>
              <p>
                Enter a strong password for your account.
              </p>
            </div>

            <form action={form2Action} className="forgot-form">
              <input
                type="hidden"
                name="email"
                value={email}

              />
    
              <label htmlFor="otp">OTP</label>

                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                />

              <label htmlFor="pass">
                New Password
              </label>

              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Enter new password"
                defaultValue={data?.pass}
             />

              <label htmlFor="cpass">
                Confirm Password
              </label>

              <input
                type="password"
                id="cpass"
                name="cpass"
                placeholder="Re-enter new password"
                
              />

              <button
                type="submit"
                className="primary-btn"
                disabled={is2Pending}
              >
                {is2Pending
                  ? "Changing..."
                  : "Change Password"}
              </button>
              <button className="primary-btn" 
                 type="button"
                onClick={()=>props.setIsedit(false)}>Back</button>

              {data?.error && (
                <p className="error-message">
                  {data.error}
                </p>
              )}

              {data?.success && (
                <p className="success-message">
                  {data.success}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}