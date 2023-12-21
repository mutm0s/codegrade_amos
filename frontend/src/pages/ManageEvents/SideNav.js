import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../App";
import RegisterAlumni from "./RegisterAlumni";
import RegisterEvent from "./RegisterEvent";
import EventList from "./EventList";
import AlumniList from "./AlumniList";
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdPreview } from "react-icons/md";
import axios from 'axios'

function SideNav() {

    const userData = useContext(GlobalContext)



    const [registerAlumni, setRegisterAlumni] = useState(false)
    const [registerEvent, setRegisterEvent] = useState(false)
    const [eventList, setEventList] = useState(false)
    const [alumniList, setAlumniList] = useState(false)
    const [permission, setPermission] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const UserPermission = async () => {

            try {

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/role?alumni=${userData ? userData.email : ""}`)
                console.log(response.data)
                setPermission(response.data)
                setLoading(false)

            }
            catch (err) {
                setLoading(false)
            }
        }

        UserPermission()

    }, [])

    console.log(permission.role)
    return (
        <Fragment>

            {

userData && userData.email !== "error" ? 

            <div className="sidenav">

            {
                permission.role==="Admin" &&
                <div onClick={() => setRegisterAlumni(true)}>
                    <IoIosPersonAdd /> <p>Register Alumni </p>
                </div>
}

                <div onClick={() => setRegisterEvent(true)}>
                    <IoIosAddCircle /> <p>Register Event</p>
                </div>

                <div onClick={() => setEventList(true)}>
                    <MdPreview /> <p>

                        {
                            permission.role==="Admin" ?

                            "View Events"

                            :
                            
                            "Your Events"
}
                        </p>
                </div>

{
    permission.role==="Admin" &&
                <div onClick={() => setAlumniList(true)}>
                    <FaUsersViewfinder />  <p>View Alumni</p>
                </div>
}

            </div>
            :
            <div >
            <h1>Please sign in</h1>
        </div>
}
            {registerAlumni && <RegisterAlumni closeModal={setRegisterAlumni} />}
            {registerEvent && <RegisterEvent closeModal={setRegisterEvent} />}
            {eventList && <EventList closeModal={setEventList} role={permission.role} />}
            {alumniList && <AlumniList closeModal={setAlumniList} />}

        </Fragment>
    )
}

export default SideNav

