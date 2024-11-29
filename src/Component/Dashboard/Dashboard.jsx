import React, { useContext } from 'react'
import "./Dashboard.css"
import { Link, Outlet } from 'react-router-dom'
import { auth } from '../config/firebase'
import { AddContext } from '../../Context/context'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const {setUserDetails} = useContext(AddContext)
    const navigate = useNavigate();
    const signOut = async() => {
        try {
            await auth.signOut();
            setUserDetails(null);
            console.log("user logged out")
            navigate("/")
        } catch (error) {
            console.error("error logging out")
        }
    }

  return (
    <div className='dashboard__div'>
        <div className='dashboard__divs'>
            <aside>
                <div className='aside__divs'>
                    <h1>dashboard</h1>
                    <ul className='aside__content'>
                    {/* <li><Link to="/dashboard/home" className='li'>home</Link></li> */}
                        <li><Link to="/dashboard/profile" className='li'>profile</Link></li>
                        <li><Link to="/dashboard/details" className='li'>details</Link></li>
                    </ul>
                    <div className='logout' style={{cursor: "pointer"}} onClick={signOut}>log out</div>
                </div>
            </aside>
            <div className='dashboard__content'>
                <Outlet/>

            </div>
        </div>

    </div>
  )
}

export default Dashboard
