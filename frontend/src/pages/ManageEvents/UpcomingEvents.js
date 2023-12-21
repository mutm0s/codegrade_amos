import React, { Fragment, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../App";
import eventimg from '../../media/events.jpg'
import axios from "axios";


function UpcomingEvents() {

    const userData = useContext(GlobalContext)

    const [ourEvents, setOurEvents] = useState([])

    const [loading, setLoading] = useState(true)

    const [load, setLoad] = useState(false)



    const convertDate = (dateString) => {

        const readableDate = new Date(dateString).toLocaleDateString()

        return readableDate
    }

    const fetchEvents = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/all`)
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

    console.log('upcomimg', ourEvents)

    const MyEvent = async (idObj, category) => {

        setLoad(true)

        const ourData = {

            email: userData ? userData.email : "",
            eventIdObj: idObj,
            category: category

        }

        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/myevent`, ourData)

            setLoad(false)
        }
        catch (err) {

            setLoad(false)
        }
    }

    return (
        <div className="upcoming-events-cont">

            <h1>Upcoming Events</h1>

            {
                ourEvents.map(eData => (

                    <div className='events-display' key={eData._id}>

                        <div className='event-info'>

                            <h2>{eData.eName}</h2>
                            <p>{convertDate(eData.eDate)} {eData.eTime}</p>
                            <p>{eData.venue}</p>

                            <div className='event-btns'>

                                <button onClick={() => MyEvent(eData._id, "confirmed")}>
                                    {
                                        load ?

                                        <div className="loading">
                                            
                                       <h1>Please Wait....</h1> 

                                    </div>
                                            :

                                            "Participate"
                                    }
                                </button>
                                <button onClick={() => MyEvent(eData._id, "fav")} >
                                    {
                                        load ?
                                            
                                        <div className="loading">

                                           <h1>Please Wait....</h1>

                                        </div>
                                            :

                                            "Fav"
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

export default UpcomingEvents