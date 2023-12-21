import React,{useState,useEffect, Fragment} from "react";
import About from "./pages/About";
import Header from "./pages/Header";
import Homepage from "./pages/Homepage";
import {Route,Routes} from 'react-router-dom'
import ManageEvents from "./pages/ManageEvents/ManageEvents";
import Login from "./Login";
import UpcomingEvents from "./pages/ManageEvents/UpcomingEvents";
import Attending from "./pages/ManageEvents/Attending";
import Saved from "./pages/ManageEvents/Saved";
import { useLocation } from "react-router-dom";
import axios from 'axios'
export const GlobalContext=React.createContext()

function App() {

  const [userData, setUserData] = useState(null)
  const[userExists,setUserExists]=useState('')
  const[check,setCheck]=useState(false)
  const callbackUrl = useLocation();


const validateEmail = (email) => {
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

useEffect(() => {
  
  const searchParams = new URLSearchParams(callbackUrl.search);
  const serverRes = searchParams.get("email");

  const checkEmail=validateEmail(serverRes)


 
  if (serverRes) {
    const userStatus = {email:serverRes};
    setUserData(userStatus);
    setUserExists(serverRes)
    console.log("User data:", userStatus);
    
   
  }

  if(checkEmail){

    setCheck(true)
    
  }
}, [callbackUrl.search]);

console.log(userData)

  return (
    <div className="App" onClick={()=>{setUserExists('') ; setCheck(false)}}>

<Fragment>

<GlobalContext.Provider  value={userData}>

      <Header />

      <Routes>

      <Route path="/" element={<Homepage />} />

      <Route path="/about" element={<About />} />

      <Route path="/manageevents" element={<ManageEvents />} />

      <Route path="/upcomingevents" element={<UpcomingEvents />} />

      <Route path="/attending" element={<Attending />} />

      <Route path="/saved" element={<Saved />} />

      <Route path="/login" element={<Login />} />

      </Routes>

      </GlobalContext.Provider>

      </Fragment>

      {
        userExists === "error" ?

        <div className="user-check" onClick={()=>setUserExists('')}>

<h1>Email not registered.</h1>
<h1>Please contact the admin <b>abartolome@alueducation.com</b> </h1>
<h1>our web facilitator to add you</h1>

        </div>
        :

        check==true ?
        <div className="user-check-success" onClick={()=>setCheck(false)}>

        <h1>You have Successfully Logged in.</h1>
        
        
                </div>
                :
                ""
      }
      
    </div>
  );
}

export default App;
