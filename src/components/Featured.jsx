import axios from "axios";
import React, { useEffect, useState } from "react";


const Featured = () => {

    const [movie, setMovie] = useState({});

    function getMovie() {
        axios.get("https://api.themoviedb.org/3/discover/tv?api_key=57843eae49bb2b4887ada75623c01553&with_networks=213")
            .then(res => {
                // console.log("response=>", res);
                let movieNum = Math.floor(Math.random() * (res.data.results.length))
                // console.log("movie=>", res.data.results[movieNum])
                // console.log("num=>", movieNum)
                setMovie(res.data.results[movieNum]);
            })
            .catch(err => {
                console.log(err);
            });
        return movie;
    }

    useEffect(() => {
        getMovie();
    }, [])

    const shortenDescription = (string) => {
        return string?.length > 150 ? string.substr(0, 150) + "..." : string;
    }


    return (
            <header className="featured" style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition:"center center"
            }}>
                <div className="darkenFeature">
                    <div className="featureInfo">
                        <h1 className="movieTitle">{movie?.name}</h1>
                        <p className="description">{shortenDescription(movie?.overview)}</p>
                        <button className="playButton">Play</button>
                    </div>
                <div className="fade"></div>
                </div>
            </header>
    )
}

export default Featured;