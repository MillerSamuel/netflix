import React from "react";
import "../style/Profile.css"
import Navbar from "./Navbar";
import { selectUser } from "../features/counter/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import db from "../firebase";
import { collection, CollectionReference, doc, DocumentSnapshot, getDoc, query, where, getDocs,addDoc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { async } from "@firebase/util";
import { loadStripe } from "@stripe/stripe-js";

const Profile = () => {

    const [products, setProducts] = useState();

    const user = useSelector(selectUser)

    const checkout=async (priceId)=>{
        const docRef=await addDoc(collection(db,"customers",user.uid,"checkout_sessions"),{
            price:priceId,
            success_url:window.location.origin,
            cancel_url:window.location.origin,
        });




        const unsub=onSnapshot((docRef),async(doc)=>{
            console.log("Current data: ", doc.data());
            const {error,sessionId}=doc.data();
            if (error){
                alert("error",error.message)
            }
            if(sessionId){
                const stripePromise= loadStripe("pk_test_51M1yJhABNDW3hHlGGZzevY5d6RuJsIm6FPra4C6Anvo7hmS7IoZd7gyqmMuJtiBp8EZUucJ0nj7x1bjWkPT7Rwcg00sBndh3S1");
                const stripe=await stripePromise;
                stripe.redirectToCheckout({sessionId})
            };
        })
    };

    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true));
        let products = {};
        getDocs(q)
            .then( querySnapshot => {
                querySnapshot.forEach(async(document) => {
                    // console.log(document.id, " => ", document.data());
                    products[document.id] = document.data();
                    const querySnapshot = await getDocs(collection(db, "products",document.id,"prices"));
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " PRICE => ", doc.data(),doc);
                        products[document.id].prices={
                            priceId:doc.id,
                            priceData: doc.data()
                        }
                    });
                })
                // for(const [key,value] of Object.entries(products)){
                //     console.log("key=>",key,"value=>",value)
                // }
                setProducts(Object.entries(products));
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
                        {products?.map(([productId,productData])=>{
                            return(
                                <div className="plans dflex">
                                    <div >
                                        <p>{productData.name}</p>
                                        <p>{productData.description}</p>
                                    </div>
                                    <button className="subscribe" onClick={()=>checkout(productData.prices.priceId)}>Subscribe</button>
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;