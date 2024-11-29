
import React, { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { AddContext } from "../../Context/context";


const Loading = () => {
  const {loading} = useContext(AddContext)
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.4)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(0.04px)",
      }}
    >
      <ClipLoader color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"/>
    </div>
  );
};
export default Loading;
