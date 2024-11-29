import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddContext } from "../../../Context/context";
const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {loading, setLoading} = useContext(AddContext)
  
  const onSubmit = async (data) => {

    const {fullName, password, email} = data;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password, fullName)
      const user = auth.currentUser
      console.log(user)
      if(user) {
        const docRef = doc(db, "User", user.uid)
        await setDoc((docRef), {
          email: user.email,
          fullName: fullName,
          password: password,
          createdAt: new Date().toISOString(),
        })
        setTimeout(() => {
          console.log("registration successful");
          toast.success("registration successful", {
            position: "top-right",
          })
          navigate("/")
          setLoading(false)
        }, 5000)
       
      } 
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("User with this email already exists", {
          position: "top-right",
        });
      } else {
        console.error("Error during registration:", error.message);
        toast.error("Error during registration", {
          position: "top-right",
        });
      }
    }}
  return (
    <div className="login__divs">
      <div className="login__logo"></div>
      <div className="login__content">
        <h2>Hey, Hello</h2>
        <p>Create account to start using Dashtail!!</p>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="forms">
          <label htmlFor="fullName">Full Name</label>
          <div className="input">
            <input
              placeholder="full name"
              type="text"
              name="fullName"
              {...register("fullName", { required: "enter your full name" })}
            />
          </div>
          {errors.fullName?.message && <p className="errors">{errors.fullName.message}</p>}
        </div>
        <div className="forms">
          <label htmlFor="email">email</label>
          <div className="input">
            <input
              placeholder="email"
              type="text"
              name="email"
              {...register("email", {
                required: "enter a valid email ",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>
          {errors.email?.message && <p className="errors">{errors.email.message}</p>}
        </div>
        <div className="forms">
          <label htmlFor="password">password</label>
          <div className="input">
            <input
              placeholder="password"
              type="password"
              name="password"
              {...register("password", {
                required: "enter your password",
                minLength: 6,
                maxLength: 10,
              })}
            />
          </div>
          {errors.password?.message && <p className="errors">{errors.password.message}</p>}
        </div>
        <div className="formss">
          <div className="flex">
            <div className="inputs">
              <input type="checkbox" name="acceptterms" {...register("acceptterms",{required: "acccept terms and condition"})} />
              
            </div>

            <label htmlFor="condition">
              you accept our terms and condition
            </label>
           
          </div>
          {errors.acceptterms?.message && <p className="errors">{errors.acceptterms.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
            {loading && (
              <ThreeDots
                visible={true}
                height="15"
                // width="40"
                color="#fff"
                style={{ display: "flex", justifyContent: "center", alignItem: "center"}}
              />
            )}
            Sign In
          </button>
        <div className="login__alternatives">
          <div className="login__icon">
            <GoogleIcon />
          </div>
          <div className="login__icon">
            <GitHubIcon />
          </div>
          <div className="login__icon">
            <FacebookRoundedIcon />
          </div>
          <div className="login__icon">
            <TwitterIcon />
          </div>
        </div>
        <div className="dont">
          Already have an account 
          <Link to="/" className="span">
           login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
