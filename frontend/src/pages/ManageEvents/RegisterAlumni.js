import React, { useState, useEffect, useContext } from "react";
import { CgCloseR } from "react-icons/cg";
import axios from "axios";

function RegisterAlumni(props) {

    const [alumniData, setAlumniData] = useState(
        {

            email: "",
            names: "",
            privileges: "",
            program: "",
            gy: ""
        }

    )

    const[loading,setLoading]=useState(false)


    const OnSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true)
    

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/users`,
            alumniData
          );

          console.log(response.data)
          
        //   setAlumniData(
        //     {

        //         email: "",
        //         names: "",
        //         privileges: "",
        //         program: "",
        //         gy: ""
        //     }
        //   )

          setLoading(false)
       
        } catch (error) {

            // setAlumniData(
            //     {
    
            //         email: "",
            //         names: "",
            //         privileges: "",
            //         program: "",
            //         gy: ""
            //     }
            //   )

              setLoading(false)
        }
      };

    console.log(alumniData)

    return (
        <div className="register-alumni" >



            <div className="form-container">

                <div className='close-modal' onClick={() => props.closeModal(false)} >

                    <CgCloseR color='#f5f5f5' size="2.5em" />

                </div>


                <form onSubmit={OnSubmit}>


                    <div className="inputs">
                        <label>Email</label>
                        <input type="email" onChange={e => setAlumniData({ ...alumniData, email: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>Names</label>
                        <input type="text" onChange={e => setAlumniData({ ...alumniData, names: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>privileges</label>
                        <select onChange={e => setAlumniData({ ...alumniData, privileges: e.target.value })}>
                            <option value="Select User Privileges">Select User Privileges</option>
                            <option value="Admin">Admin</option>
                            <option value="user">user</option>

                        </select>
                    </div>

                    <div className="inputs">
                        <label>Program</label>
                        <input type="text" onChange={e => setAlumniData({ ...alumniData, program: e.target.value })} required />

                    </div>

                    <div className="inputs">
                        <label>Graduation Year</label>
                        <input type="text" onChange={e => setAlumniData({ ...alumniData, gy: e.target.value })} required />

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

export default RegisterAlumni