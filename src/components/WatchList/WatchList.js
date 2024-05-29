import React, { useEffect } from "react";
import "./WatchList.css";
import { useNavigate } from "react-router-dom";
import "../hero/Hero.css";

const WatchList = ({ watchList, auth, setOpenLoginModal }) => {
  const navigate = useNavigate();
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  useEffect(() => {
    !auth && !sessionStorage.getItem("email") && setOpenLoginModal(true);
  }, []);

  return auth ? (
    <div className="movie-detail1">
      {watchList &&
        watchList.length > 0 &&
        watchList?.map((movie) => (
          <div
            className="movie-poster"
            onClick={() => reviews(movie.imdbId)}
            style={{
              position: "unset",
              margin: "20px",
            }}
          >
            <img src={movie.poster} alt="" />
          </div>
        ))}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "26px",
      }}
    >
      Please login to view your watch List
    </div>
  );
};

export default WatchList;
