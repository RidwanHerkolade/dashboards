import React, { useState } from 'react'
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register';
import Forget from '../Auth/ForgetPassword/Forget';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./HomePage.css"
import HomeContent from './HomeContent';


const HomePage = () => {
    // const [activeForm, setActiveForm] = useState("login")
    // const renderform = () => {
    //     switch(activeForm) {
    //         case "login":
    //         return <Login/>
    //         case "register":
    //         return <Register/>
    //         case "forget":
    //         return <Forget/>
    //         default :
    //          return <Login/>
    //     }
    // }
  return (
      <main className='main'>
          <div className='homepage__divs'>
              <HomeContent/>
              <section>
                  <Login/>
              </section>
          </div>
      </main>
  )
}

export default HomePage
