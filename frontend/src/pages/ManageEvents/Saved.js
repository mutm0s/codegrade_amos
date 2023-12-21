import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../App";
import eventimg from '../../media/events.jpg'
import axios from "axios";


function Saved(){

    const userData = useContext(GlobalContext)

    const [ourEvents, setOurEvents] = useState([])

    const [loading, setLoading] = useState(true)

    const [load, setLoad] = useState(false)

    const fetchEvents = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/myevent?alumni=${userData ? userData.email : ""}`)

            console.log(response.data)
            setOurEvents(response.data)
            setLoading(false)

        }
        catch (err) {

            setLoading(false)
        }

    }

    useEffect(() => {

        fetchEvents()

    }, [])

    const convertDate = (dateString) => {

        const readableDate = new Date(dateString).toLocaleDateString()

        return readableDate
    }



    return(
        <div className="upcoming-events-cont">

            <h1>Saved Events</h1>
           
            {
                ourEvents.map(eData => (

                    <div className='events-display' key={eData._id}>

                        <div className='event-info'>

                            <h2>{eData.eventIdObj.eName}</h2>
                            <p>{convertDate(eData.eventIdObj.eDate)} {eData.eTime}</p>
                            <p>{eData.eventIdObj.venue}</p>

                            <div className='event-btns'>

                                <button  >
                                    {
                                        load ?
                                            "Please Wait..."
                                            :

                                            "Cancel"
                                    }
                                </button>

                            </div>

                        </div>

                        <div className='events-img'>
                            <img src={eventimg} alt='event' />
                        </div>

                    </div>
                ))

            }

        </div>
    )
}

export default Saved