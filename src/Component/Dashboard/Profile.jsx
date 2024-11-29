import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AddContext } from "../../Context/context";
import Users from "../Auth/Users/Users";


const Profile = () => {
  const {userDetails, setUserDetails} = useContext(AddContext)
  const fetchUserData = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        try {
          const docRef = doc(db, "User", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("User data does not exist");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      // } else {
      //   console.log("User is not logged in");
      // }
    });
  };
  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <div className="profile__divs">
      <div className="profile__div">
        <div className="wel">
          {" "}
         <div className="h1">welcome {userDetails?.fullName} 😎</div> 
          <div className="inputsss">
            <input type="text" />
          </div>
        </div>
        <Users/>
      </div>
    </div>
  );
};
export default Profile;
