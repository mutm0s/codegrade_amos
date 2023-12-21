import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../App";
import { CgCloseR } from "react-icons/cg";
import { FaUndo } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import axios from "axios";

function EventList(props) {

    const userData = useContext(GlobalContext)

    const [ourEvents, setOurEvents] = useState([])

    const [loading, setLoading] = useState(true)

    const [dialogBox, setDialogBox] = useState({status:false,eventid:""})

    const [dltRes, setDltRes] = useState([])

    console.log(props.role)

    const getEvents = async () => {

        try {

            if( userData && props.role==="Admin"){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/all`)
            setOurEvents(response.data)
            setLoading(false)
            }

            else if(userData && props.role==="user"){

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/events?alumni=${userData ? userData.email : ""}`)
                setOurEvents(response.data)
                setLoading(false)

            }


        }
        catch (err) {

            setLoading(false)
        }

    }

    useEffect(() => {

        getEvents()

    }, [])

    const DeleteEvent = async (id) => {

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/events?OurEventId=${id}`)

            setDltRes(response.data)

            getEvents()

            setLoading(false)
            setDialogBox({status:false,eventid:""})

        }
        catch (err) {

            setLoading(false)
        }
    }

    const convertDate = (dateString) => {

        const readableDate = new Date(dateString).toLocaleDateString()

        return readableDate
    }

    console.log('events', ourEvents)
    return (
        <div className="register-alumni" >

            <div className="form-container">

                <div className='close-modal' onClick={() => props.closeModal(false)} >

                    <CgCloseR color='#f5f5f5' size="2.5em" />

                </div>

                <table id="table" >
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Type</th>
                            <th>Venue</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            loading ?

                            "Please Wait"
                            :
                            ourEvents.map(eData => (
                                <tr key={eData._id}>
                                    <td>{eData.eName}</td>
                                    <td>{eData.eType}</td>
                                    <td>{eData.venue}</td>
                                    <td>{convertDate(eData.eDate)}</td>
                                    <td>{eData.eTime}</td>
                                    <td><FaUndo size="1em" className="center-icon" /></td>
                                    <td><MdOutlineAutoDelete size="1em" className="center-icon" onClick={() => setDialogBox({status:true,eventid:eData._id})} /></td>

                                    {
                                        dialogBox.status &&

                                        <div className="dialog-box">

                                            <h2>Proceed with deletion? Click 'Yes'.</h2>

                                            <div className="dialog-btns">

                                                <button onClick={() => DeleteEvent(dialogBox.eventid)} disabled={loading}>
                                                    {
                                                        loading ?
                                                        "Please Wait..."
                                                        :
                                                   "Yes" 
}
                                                    </button>
                                                <button onClick={() => setDialogBox(false)}>No</button>

                                            </div>

                                        </div>
                                    }

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default EventList