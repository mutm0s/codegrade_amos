import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { CgCloseR } from "react-icons/cg";


function Navigation(props) {

    const userData = useContext(GlobalContext)



    return (

        <nav className='menu-navigation'>

            <div className='close-modal' onClick={() => props.closeMenu(false)} >

                <CgCloseR color='#f5f5f5' size="3em" />

            </div>

            <Links to="/" onClick={() => props.closeMenu(false)}>

                <div className='links'>
                    Home
                </div>

            </Links >

            <Links to="/about" onClick={() => props.closeMenu(false)}>

                <div className='links'>
                    About
                </div>

            </Links >
{
    userData && userData.email !== "error" ?
     
    <>
            <Links to="/manageevents" onClick={() => props.closeMenu(false)} >

                <div className='links'>
                    Manage Events
                </div>

            </Links >

            <Links to="/upcomingevents" onClick={() => props.closeMenu(false)}>

                <div className='links'>
                    Upcoming Events
                </div>

            </Links >

            <Links to="/attending" onClick={() => props.closeMenu(false)} >

                <div className='links'>
                    Attending
                </div>


            </Links >

            <Links to="/saved" onClick={() => props.closeMenu(false)} >

                <div className='links'>
                    Saved
                </div>

            </Links >
 

            
                
            </>
            :
            ""
}
            
<Links to="/login" onClick={() => props.closeMenu(false)} id="sign-in">
  <div className='links'>
    Sign In
    <span className="glass-effect"></span>
  </div>
</Links>






        </nav>
    )
}

export default Navigation

function Links({ to, children, ...props }) {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (


        <Link to={to} {...props} className={isActive ? 'active' : ""}>
            {children}
        </Link>

    )

}