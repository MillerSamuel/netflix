import React from "react";
import Navbar from "./Navbar";
import "../style/MainScreen.css"
import Featured from "./Featured";
import Row from "./Row";
import { useEffect } from "react";
import disableScroll from "disable-scroll"
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { useNavigate } from "react-router-dom";

const MainScreen=()=>{
    const user = useSelector(selectUser);
    const navigate=useNavigate();

    const signoutHandler=()=>{
        if(user==null){
            navigate("/SignIn")
        }
    }
    useEffect(()=>{
        disableScroll.off();
        setTimeout(
            signoutHandler,500
        )
    },[])

    return(
        <div className="mainScreen">
            <Navbar></Navbar>
            <Featured></Featured>
            <Row title="Trnding" url="https://api.themoviedb.org/3/trending/all/week?api_key=57843eae49bb2b4887ada75623c01553"></Row>
            <Row title="Top Rated" url="https://api.themoviedb.org/3/movie/top_rated?api_key=57843eae49bb2b4887ada75623c01553"></Row>
            <Row title="Netflix Originals" url="https://api.themoviedb.org/3/discover/tv?api_key=57843eae49bb2b4887ada75623c01553&with_networks213"></Row>
            <Row title="Action" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=28"></Row>
            <Row title="Adventure" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=12"></Row>
            <Row title="Comedy" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=35"></Row>
            <Row title="Crime" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=80"></Row>
            <Row title="Documentary" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=99"></Row>
            <Row title="Drama" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=18"></Row>
            <Row title="Family" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=10751"></Row>
            <Row title="Horror" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=27"></Row>
            <Row title="Romance" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=10749"></Row>
            <Row title="War" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=28"></Row>
            <Row title="Fantasy" url="https://api.themoviedb.org/3/discover/movie?api_key=57843eae49bb2b4887ada75623c01553&with_genres=10752"></Row>
        </div>
    )
}
export default MainScreen;
