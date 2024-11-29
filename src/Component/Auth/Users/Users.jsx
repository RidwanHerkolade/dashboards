import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./Users.css"

const Users = () => {
    const [users, setUsers] = useState([])
    const fetchAllUsers = async () => {
        const usersList = [];
        try {
            const querySnapShot = await getDocs(collection(db, "User"))
            querySnapShot.forEach((doc) => {
                usersList.push({id: doc.id, ...doc.data()})
            })
            setUsers(usersList)
        } catch(error){
            console.error("error fetching users")
 
        }
    }
    useEffect(() => {
        fetchAllUsers()

    },[])
  return ( 
    <div className="users__div">
      <div className="user__div">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              {/* <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : ""}</td> */}
            </tr>
          ))}
        </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;
