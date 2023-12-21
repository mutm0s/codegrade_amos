import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../media/logo.jpeg'
import '../css/alumni.css'
import Navigation from './Navigation';


function Header(){

    const[showMenu,setShowMenu]=useState(false)

    return(
<>
        <div className='header'>
            
            
            <div className='logo'>

            <Link to="/">
              <img src={logo} alt="logo" />  
              </Link>
            </div>
           

            <div className='menu-icon' onClick={() => setShowMenu(true)}>
            <GiHamburgerMenu color='#f8f8f8' size='2em'/>
            </div>

           

        </div>

       {showMenu && <Navigation closeMenu={setShowMenu}/>}

        </>
    )
}

export default Header