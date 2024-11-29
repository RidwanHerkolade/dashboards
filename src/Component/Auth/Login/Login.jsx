import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import {
  auth,
  db,
  facebookProvider,
  googleProvider,
} from "../../config/firebase";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // Import serverTimestamp
import "./Login.css";
import { ThreeDots} from "react-loader-spinner";
import { AddContext } from "../../../Context/context";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {loading, setLoading} = useContext(AddContext)
  // SIGN IN WITH EMAIL AND PASSWORD
  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(
        doc(db, "User", user.uid),
        {
          email: user.email,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );
      setTimeout(() => {
        toast.success("Successfully logged in", { position: "top-right" });
        navigate("/dashboard");
        setLoading(false); // Stop loading after navigation
      }, 5000);
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email", {
          position: "top-right",
        });
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password", { position: "top-right" });
      } else {
        toast.error(`Error: ${error.message}`, { position: "top-right" });
      }
    }
  };

  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name: user.displayName,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      toast.success("Successfully signed in", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error while signing in with Google", error);
      toast.error("Error while signing in", { position: "top-right" });
    }
  };

  // SIGN IN WITH FACEBOOK
  const signInWithFb = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name: user.displayName,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      toast.success("Successfully signed in", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error while signing in with Facebook", error);
      toast.error("Error while signing in", { position: "top-right" });
    }
  };
  return (
    <div className="login__divs">
      <div className="login__logo"></div>
      <div className="login__content">
        <h2>Hey, Hello 👋</h2>
        <p>Enter the information you entered while registering !!</p>
      </div> 
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="forms">
          <label htmlFor="email">email</label>
          <div className="input">
            <input
              placeholder="email"
              type="text"
              {...register("email", {
                required: "Enter a valid email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>
          {errors.email?.message && (
            <p className="errors">{errors.email.message}</p>
          )}
        </div>
        <div className="forms">
          <label htmlFor="password">password</label>
          <div className="input">
            <input
              placeholder="password"
              type="password"
              {...register("password", {
                required: "Enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 12,
                  message: "Password must not exceed 12 characters",
                },
              })}
            />
          </div>
          {errors.password?.message && (
            <p className="errors">{errors.password.message}</p>
          )}
        </div>
        <div className="formss">
          <div className="flex">
            <input type="checkbox" {...register("rememberMe")} />
            <label>remember me</label>
          </div>
        </div>
        <div className="forms">
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
           
        
        </div>
        <div className="login__alternatives">
          <div onClick={signInWithGoogle} className="login__icon">
            <GoogleIcon style={{ cursor: "pointer" }} />
          </div>
          <div onClick={signInWithFb} className="login__icon">
            <FacebookRoundedIcon style={{ cursor: "pointer" }} />
          </div>
          <div onClick={signInWithFb} className="login__icon">
            <TwitterIcon style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="dont">
          Don't have an account
          <Link to="registerpage" className="span">
            Sign Up
          </Link>
        </div>
      </form> 
    
    </div>
  );
};

export default Login;
