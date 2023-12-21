import React from "react";
import { IoMdLogIn } from "react-icons/io";

function Login(){

    const innitiateGoogleAuth = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google/callback`;
//check
        
    }

    console.log(process.env.REACT_APP_API_URL)

    return(

        <div className="login-cont">

            <div className="glass-overlay"></div>

            <div className="login-content">

                <button onClick={innitiateGoogleAuth}><p>Sign In With Google</p> <IoMdLogIn /></button>

            </div>

        </div>
    )
}

export default Login