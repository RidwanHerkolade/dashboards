import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Auth/Login/Login";
import RegisterPage from "./Component/Auth/Register/RegisterPage";
import HomePage from "./Component/Home/HomePage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Component/Dashboard/Dashboard";
// import Home from "./Component/Dashboard/Home";
import Profile from "./Component/Dashboard/Profile";
import Details from "./Component/Dashboard/Details";
import AddContextProvider from "./Context/context";
import "./App.css";

function App() {
  return (
    <>
    <AddContextProvider>
    <BrowserRouter>
     {/* <HomeContent/> */}
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="registerpage" element={<RegisterPage />} />
        
        <Route path="dashboard" element={<Dashboard/>}>
           <Route index element={<Profile />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="details" element={<Details/>}/>
        </Route>
      </Routes>
      <ToastContainer bodyClassName= "custom-toast-body"
        />
    </BrowserRouter>
    </AddContextProvider>
    </>
  );
}

export default App;
