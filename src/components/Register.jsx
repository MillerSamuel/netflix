import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../style/SignUp.css"
import { useRef } from "react";
import { auth } from "../firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const navigate=useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
            navigate("/View");
        }).catch((error) => {
            console.log(error)
            alert("Invalid credentials")
        })
    }


    return (
        <div className="signUp">
            <div className="darken">
                <div className="d-flex">
                    <Link to="/"><img className="logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" /></Link>
                </div>
                <div className="formContainer">
                    <form className="signInForm">
                        <h1 style={{color:"white"}}>Register</h1>
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <input onClick={register} className="submitButton" type="submit" value=" Register" />
                    </form>
                    <h4 className="new">Already have an account? <Link to="/SignIn" style={{ color: "white", textDecoration: "none" }} >Sign in now</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default Register;