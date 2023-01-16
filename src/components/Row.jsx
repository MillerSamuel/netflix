import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import disableScroll from "disable-scroll"
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import db from "../firebase";
import { collection, CollectionReference, doc, DocumentSnapshot, getDoc, query, where, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Row = ({ title, url }) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [error, setError] = useState();
    const [subscription, setSubscription] = useState({});
    const user = useSelector(selectUser);
    const [noSub, setNoSub] = useState(false);
    const navigate = useNavigate();


    const opts = {
        margin: "200px",
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }



    const trailerHandler = async (movie) => {
        // for (const [key, value] of Object.entries(movie)) {
        //     console.log(`${key}: ${value}`);
        // }
        if (subscription.plan != null) {
            if (error) {
                setError(!error);
                disableScroll.off();
            }
            else {
                if (trailerUrl) {
                    setTrailerUrl("")
                }
                else {
                    movieTrailer(null, { tmdbId: movie.id, multi: false })
                        .then(response => {
                            const urlParams = new URLSearchParams(new URL(response).search);
                            setTrailerUrl(urlParams.get("v"));
                        })
                        .catch(() => {
                            setError(!error)
                            disableScroll.on();
                        })
                }
            }
        }
        else {
            setNoSub(true);
            disableScroll.on();
        }

    }



    const getRow = () => {
        axios.get(url)
            .then(res => {
                setMovies(res.data.results)
            })
    }

    useEffect(() => {
        getRow();
        if (user != null) {
            getDocs(collection(db, "customers", user.uid, "subscriptions"))
                .then(querySnapshot => {
                    querySnapshot.forEach(async (oneDoc) => {
                        setSubscription({ plan: oneDoc.data().items[0].price.product.name, end: (oneDoc.data().current_period_end.toDate()) });
                    })
                })
        }

    }, [])

    return (
        <div className="row">
            <h1 className="title">{title}</h1>
            <div className=" allMovies">
                {movies.map(movie => (
                    <img onClick={() => trailerHandler(movie)} key={movie.id} className="movie" src={`https://image.tmdb.org/t/p/w154/${movie?.poster_path}`} alt="" />
                ))}
            </div>
            {trailerUrl != "" && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
            {error &&
                <div className="error">
                    <div className="dim" onClick={() => trailerHandler(null)}></div>
                    <p style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", height: "100%" }}>No Trailer Available</p>
                </div>
            }
            {noSub &&
                <div className="noSub">
                    <p style={{ margin: "25px", fontSize: "20pt" }}>You have not yet subscribed to a payment plan. Please choose a plan to use our service!</p>
                    <button className="profileButton" onClick={() => navigate("/profile")}>View Profile</button>
                </div>
            }
        </div>
    )
}

export default Row;