import React from "react";
import "../style/Profile.css"
import Navbar from "./Navbar";
import { selectUser } from "../features/counter/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import db from "../firebase";
import { collection, CollectionReference, doc, DocumentSnapshot, getDoc, query, where,getDocs } from "firebase/firestore";
import { useState } from "react";

const Profile = () => {

    const [products, setProducts] = useState();

    const user = useSelector(selectUser)

    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true))
        getDocs(q)
        .then(querySnapshot=>{
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
        })
        });

    }, [])


    return (
        <div className="profile">
            <Navbar></Navbar>
            <div className="profileBody">
                <h1 style={{ "fontSize": "30pt", color: "white" }}>Edit Profile</h1>
                <div className="border"></div>
                <div className="dflex">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="avatar2" alt="ProfileLogo" />
                    <div className="profileContainer">
                        <div className="profileEmail">{user?.email}</div>
                        <p className="planHeader">Plans (Current plan)</p>
                        <div className="border"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;