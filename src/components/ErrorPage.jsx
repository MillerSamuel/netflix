import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <div className="signUp">
                <div className="darken">
                    <div className="d-flex">
                        <Link to="/"><img className="logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" /></Link>
                    </div>
                    <div className="formContainer">
                        <h1 style={{textAlign:"center"}}>Oops, the page you are searching for does not exist!</h1>
                        <Link to="/"><p style={{textAlign:"center",margin:"10px",fontSize:"17pt"}}>Return Home</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;