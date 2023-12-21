import React,{useState,useEffect,useContext} from "react";
import { GlobalContext } from "../../App";
import { CgCloseR } from "react-icons/cg";
import { FaUndo } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import axios from "axios";

function AlumniList(props) {

    const[alumni,setAlumni]=useState([])

    const[loading,setLoading]=useState(true)

    const [dialogBox, setDialogBox] = useState({status:false,userId:""})

    const [dltRes, setDltRes] = useState([])

    const getAlumni = async () => {

        try {
    
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/retrieveUsers`)
            setAlumni(response.data)
            setLoading(false)
    
        }
        catch (err) {
    
            setLoading(false)
        }
    
    }
    
    useEffect(() => {
    
        getAlumni()
    
    }, [])

    const DeleteAlumni = async (id) => {

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/users?alumniId=${id}`)

            setDltRes(response.data)

            getAlumni()

            setLoading(false)
            setDialogBox({status:false,userId:""})

        }
        catch (err) {

            setLoading(false)
        }
    }

    console.log(alumni)

    return (
        <div className="register-alumni" >



            <div className="form-container">

                <div className='close-modal' onClick={() => props.closeModal(false)} >

                    <CgCloseR color='#f5f5f5' size="2.5em" />

                </div>

                <table id="table" >
    <thead>
        <tr>
        <th>Email</th>
        <th>Names</th>
        <th>User Type</th>
        <th>Program</th>
        <th>Grad Year</th>
        <th>Update</th>
        <th>Delete</th>
        </tr>
    </thead>


    <tbody>
{
    loading ?

    "Please Wait.."

    :
    alumni.map(uData=>(
        <tr key={uData._id}>
            <td>{uData.email}</td>
            <td>{uData.names}</td>
            <td>{uData.privileges}</td>
            <td>{uData.program}</td>
            <td>{uData.gy}</td>
            <td><FaUndo size="1em" className="center-icon"/></td>
            <td><MdOutlineAutoDelete size="1em" className="center-icon" onClick={() => setDialogBox({status:true,userId:uData._id})} /></td>

            {
                                        dialogBox.status &&

                                        <div className="dialog-box">

                                            <h2>Proceed with deletion? Click 'Yes'.</h2>

                                            <div className="dialog-btns">

                                                <button onClick={() => DeleteAlumni(dialogBox.userId)} disabled={loading}>
                                                    {
                                                        loading ?
                                                        "Please Wait..."
                                                        :
                                                   "Yes" 
}
                                                    </button>
                                                <button onClick={() => setDialogBox({status:false})}>No</button>

                                            </div>

                                        </div>
                                    }
        </tr>
     ) )
}
    </tbody>

</table>


            </div>

        </div>
    )
}

export default AlumniList