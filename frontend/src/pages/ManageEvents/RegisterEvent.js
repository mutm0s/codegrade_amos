import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../App";
import { CgCloseR } from "react-icons/cg";
import axios from 'axios'

function RegisterEvent(props) {

    const userData = useContext(GlobalContext)

 const[eventData,setEventData]=useState(

    {

        eName:"",
        venue:"",
        eType:"",
        eDate:"",
        eTime:"",
        EventCoordinator:userData ? userData.email : ""
    }

 )
 const[loading,setLoading]=useState(false)


 const OnSubmit = async (e) => {
     e.preventDefault();
     
     setLoading(true)
 

     try {
       const response = await axios.post(
         `${process.env.REACT_APP_API_URL}/api/v1/events`,
         eventData
       );

       console.log(response.data)
       


       setLoading(false)
    
     } catch (error) {



           setLoading(false)
     }
   };

 console.log(eventData)

    return (

        <div className="register-alumni" >



            <div className="form-container">

                <div className='close-modal' onClick={() => props.closeModal(false)} >

                    <CgCloseR color='#f5f5f5' size="2.5em" />

                </div>


                <form onSubmit={OnSubmit}>


                    <div className="inputs">
                        <label>Event Name</label>
                        <input type="text" onChange={e => setEventData({ ...eventData, eName: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>Venue</label>
                        <input type="text" onChange={e => setEventData({ ...eventData, venue: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>Type</label>
                        <select onChange={e => setEventData({ ...eventData, eType: e.target.value })}>
                            <option value="Select User Privileges">Select Event Type</option>
                            <option value="ProfessionalDevelopment">Professional Development</option>
                            <option value="Networking">Networking</option>
                            <option value="CampusEvent">Campus Event</option>

                        </select>
                    </div>

                    <div className="inputs">
                        <label>Date</label>
                        <input type="date" onChange={e => setEventData({ ...eventData, eDate: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>Time</label>
                        <input type="time" onChange={e => setEventData({ ...eventData, eTime: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>Register</label>
                        <button type="submit" disabled={loading}>
                            {
                            loading?
                            "Loading..."
                            :
                            "Register"
}
                        </button>
                    </div>




                </form>
            </div>

        </div>
    )
}

export default RegisterEvent