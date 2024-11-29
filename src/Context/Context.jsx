import React, { createContext, useState } from 'react'

export const AddContext = createContext(null)
const AddContextProvider = (props) => {
    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() =>{
  //     setLoading(false)
  //   }, 5000)
  // },[])
    const contextValue = {
        userDetails,
        setUserDetails,
        loading,
        setLoading,
    };
  return (
    <AddContext.Provider value={contextValue}>
        {props.children}
    </AddContext.Provider>
  )
}
export default AddContextProvider