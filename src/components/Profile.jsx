import React from "react";
import "../style/Profile.css"
import Navbar from "./Navbar";
import { selectUser } from "../features/counter/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import db from "../firebase";
import { collection, QuerySnapshot } from "firebase/firestore";
import { useState } from "react";

const Profile = () => {

    const [products,setProducts]=useState();

    const user = useSelector(selectUser)

    useEffect(()=>{
        collection("products")
        .where("active","==", "true")
        .get()
        .then((querySnapshot)=>{
            const products={};
            querySnapshot.forEaach(async productDoc=>{
                products[productDoc.id]=productDoc.data();
                const  priceSnap=await productDoc.ref.collection("prices").get();
                priceSnap.Docs.forEach(price=>{
                    products[productDoc.id].prices={
                        priceId:price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products)
        });
    },[])


    return (
        <div className="profile">
            <Navbar></Navbar>
            <div className="profileBody">
                <h1 style={{ "fontSize": "30pt" ,color:"white" }}>Edit Profile</h1>
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