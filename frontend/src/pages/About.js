import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";
import eventimg from '../media/events.jpg'
import axios from "axios";


function About() {

    const userData = useContext(GlobalContext)

    const [ourEvents, setOurEvents] = useState([])

    const [loading, setLoading] = useState(true)

    const [load, setLoad] = useState(false)

    const fetchEvents = async () => {

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/numEvents`)
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

    console.log('about', ourEvents)

    return (
        <div className='about'>

            <div className='about-img'>

                <h1>About Us</h1>

            </div>

            <div className='about-content'>

                <div className='abt-txt'>
                    <p>
                        Welcome to a vibrant community where connections flourish and success stories unfold! Our platform is a dedicated hub, meticulously designed to unite graduates and cultivate a robust sense of camaraderie among alumni. At the heart of our mission lies a commitment to crafting exceptional events that empower individuals on both personal and professional fronts. Join us on a journey of growth, networking, and celebration as we elevate the collective achievements of our esteemed alumni. Your success story starts here – embrace the power of community with us!
                    </p>

                </div>

                <h1>Latest Events</h1>

                {
                    ourEvents.map(eData => (

                        <div className='events-display' key={eData._id}>

                            <div className='event-info'>

                                <h2>{eData.eName}</h2>
                                <p>{convertDate(eData.eDate)} {eData.eTime}</p>
                                <p>{eData.venue}</p>

                                {
                                    userData &&
                                    <div className='event-btns'>

                                        <button onClick={() => MyEvent(eData._id, "confirmed")}>
                                            {
                                                load ?
                                                    "Please Wait..."
                                                    :

                                                    "Participate"
                                            }
                                        </button>
                                        <button onClick={() => MyEvent(eData._id, "fav")} >
                                            {
                                                load ?
                                                    "Please Wait..."
                                                    :


                                                    "Fav"
                                            }
                                        </button>

                                    </div>
                                }

                            </div>

                            <div className='events-img'>
                                <img src={eventimg} alt='event' />
                            </div>

                        </div>
                    ))

                }



            </div>

        </div>
    )
}

export default About