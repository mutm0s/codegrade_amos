import React,{useContext} from "react";
import SideNav from "./SideNav";
import { GlobalContext } from "../../App";


function Test(){

    const userData = useContext(GlobalContext)
    
    return(
        <div className="test">
           <SideNav />


        </div>
    )
}

export default Test