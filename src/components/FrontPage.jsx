import React from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import { auth } from "../firebase";
import "../style/FrontPage.css";
import disableScroll from "disable-scroll"


const FrontPage = () => {
    

    useEffect(()=>{
        auth.signOut();
        disableScroll.off();
    },[])

    return (
        <div className="frontPage">
            <div className="backgroundImage ">
                <div className="darken">
                    <div className="d-flex">
                        <img className="logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />
                        <Link to="/SignIn"><button className="sign-in">Sign In</button></Link>
                    </div>
                    <div className="loginBody">
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h3>Watch anywhere. Cancel anytime.</h3>
                        <p>Ready to watch? Enter your email to create or restart your membership.</p>
                        <form >
                            <input className="loginInput" type="email" placeholder="Email Adress" />
                            <Link to="/Register"><button  className="loginButton">Get Started</button></Link>
                        </form>
                    </div>
                </div>
            </div>
            <div className="border"></div>
            <div className="info">
                <div className="infoText">
                    <h1>Enjoy on your TV.</h1>
                    <h3>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h3>
                </div>
                <div className="imgContainer">
                    <div className="animationContainer">
                        <img  className="img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" data-uia="our-story-card-img"/>
                        <div className="animation2">
                            <video className="video" autoPlay muted loop playsInline>
                                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4"></source>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border"></div>
            <div className="info">
                <img className="infoImage" style={ {marginLeft:"8vw"}} src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="" />
                <div className="infoText">
                    <h1>Download your shows to watch offline.</h1>
                    <h3>Save your favorites easily and always have something to watch.</h3>
                </div>
            </div>
            <div className="border"></div>
            <div className="info">
            <div className="infoText">
                    <h1>Create profiles for kids.</h1>
                    <h3>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</h3>
                </div>
                <img className="infoImage" style={{marginRight:"10vw"}} src="https://occ-0-7-6.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png?r=11f" alt="" />
            </div>
            <div className="border"></div>
            <div className="bottomLogin">
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                            <form >
                                <input className="bottomInput" type="email" placeholder="Email Adress" />
                                <Link to="/Register"><button style={{marginTop:'15px'}} className="loginButton">Get Started</button></Link>
                            </form>
            </div>
        </div>
    )
}

export default FrontPage;