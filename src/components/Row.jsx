import axios from "axios";
import React, { useEffect, useState } from "react";


const Row = ({ title, url }) => {
    const [movies, setMovies] = useState([]);

    const getRow = () => {
        axios.get(url)
            .then(res => {
                console.log("Row=>", res)
                setMovies(res.data.results)
            })
    }

    useEffect(() => {
        getRow();
    }, [])

    console.log(movies);

    return (
        <div className="row">
            <h1 className="title">{title}</h1>
            <div className=" allMovies">
                {movies.map(movie => (
                    <img className="movie" src={`https://image.tmdb.org/t/p/w154/${movie?.poster_path}`} alt="" />
                ))}
            </div>
        </div>
    )
}

export default Row;