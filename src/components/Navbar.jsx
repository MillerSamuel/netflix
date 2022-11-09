import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../firebase"

const Navbar=()=>{
    const navigate=useNavigate();
    const[scroll,setScroll]=useState(false);

    const logoutHandler=()=>{
        auth.signOut();
        navigate("/");
    }

    const navTransitioner=()=>{
        if(window.scrollY>25){
            setScroll(true);
        }
        else{
            setScroll(false);
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",navTransitioner);
        return ()=> window.removeEventListener("scroll",navTransitioner);
    },[])


    return(
        <div className={`NavBar ${scroll &&'black'}`}>
            <div className="d-flex">
                    <Link to="/View"><img className="logoNav" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" /></Link>
                    <div className="d-flex">
                        <img onClick={()=>{navigate("/Profile")}} className="avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatr" />
                        <button onClick={()=>logoutHandler()} className="logout">Logout</button>
                    </div>
            </div>
        </div>
        
    )
}

export default Navbar;