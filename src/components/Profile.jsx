import React from "react";
import "../style/Profile.css"
import Navbar from "./Navbar";
import { selectUser } from "../features/counter/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import db from "../firebase";
import { collection, CollectionReference, doc, DocumentSnapshot, getDoc, query, where, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { async } from "@firebase/util";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./Loading";
import disableScroll from "disable-scroll";
import { useNavigate } from "react-router-dom";


const Profile = () => {

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState({});
    const navigate=useNavigate();

    const user = useSelector(selectUser);

    useEffect(()=>{
        disableScroll.off();
        if(user==null){
            navigate("/SignIn")
        }
        
    },[])

    useEffect(() => {
        if (user?.uid != null) {
            getDocs(collection(db, "customers", user.uid, "subscriptions"))
                .then(querySnapshot => {
                    querySnapshot.forEach(async (oneDoc) => {
                        setSubscription({ plan: oneDoc.data().items[0].price.product.name, end: (oneDoc.data().current_period_end.toDate()) });
                    // console.log(subscription);
                    })
                })
        }
    }, [user])

    


    const checkout = async (priceId) => {
        setLoading(true);
        const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
            price: priceId,
            success_url: window.location.href,
            cancel_url: window.location.href,
        });
        onSnapshot((docRef), async (doc) => {
            // console.log("Current data: ", doc.data());
            const { error, sessionId } = doc.data();
            if (error) {
                alert("error", error.message);
            }
            if (sessionId) {
                const stripePromise = loadStripe("pk_test_51M1yJhABNDW3hHlGGZzevY5d6RuJsIm6FPra4C6Anvo7hmS7IoZd7gyqmMuJtiBp8EZUucJ0nj7x1bjWkPT7Rwcg00sBndh3S1");
                const stripe = await stripePromise;
                stripe.redirectToCheckout({ sessionId })
            };
        })
    };

    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true));
        let products = {};
        getDocs(q)
            .then(querySnapshot => {
                querySnapshot.forEach(async (document) => {
                    // console.log(document.id, " => ", document.data());
                    products[document.id] = document.data();
                    const querySnapshot = await getDocs(collection(db, "products", document.id, "prices"));
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " PRICE => ", doc.data(),doc);
                        products[document.id].prices = {
                            priceId: doc.id,
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
            {loading ? <div className="loading">{Loading({ type: "spin", color: "Red" })}</div> : null}
            <div className="profileBody">
                <h1 style={{ "fontSize": "30pt", color: "white" }}>Edit Profile</h1>
                <div className="border"></div>
                <div className="dflex">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="avatar2" alt="ProfileLogo" />
                    <div className="profileContainer">
                        <div className="profileEmail">{user?.email}</div>
                        <p>{subscription.plan != null &&
                            <div>
                                <p style={{ fontSize: "18pt" }}>Your Plan is: {subscription?.plan}</p>
                                <p style={{ fontSize: "18pt" }}>Your Plan ends: {subscription?.end?.toDateString()}</p>
                            </div>
                        }</p>
                        <div className="border"></div>
                        {products?.map(([productId, productData]) => {
                            if (productData.name == subscription.plan) {
                                return (
                                    <div key={productId} className="plans dflex">
                                        <div >
                                            <p>{productData.name}</p>
                                            <p>{productData.description}</p>
                                        </div>
                                        <button className="subscribe" style={{"cursor":"unset","backgroundColor":"grey"}}> Current Plan</button>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={productId} className="plans dflex">
                                        <div >
                                            <p>{productData.name}</p>
                                            <p>{productData.description}</p>
                                        </div>
                                        <button className="subscribe" onClick={() => checkout(productData.prices.priceId)}>Subscribe</button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;