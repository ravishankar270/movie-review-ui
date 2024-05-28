import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axiosConfig";

const Hero = ({ movies, watchList, setWatchList, setOpenLoginModal }) => {
  const navigate = useNavigate();
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  const watchListFunc = async (imdbId, remove = false) => {
    if (!sessionStorage.getItem("email")) setOpenLoginModal(true);
    else {
      try {
        let watchList;
        if (remove) {
          watchList = await axios.put("api/v1/user", {
            email: sessionStorage.getItem("email"),
            imdbId,
            action: "remove",
          });
        } else {
          watchList = await axios.put("api/v1/user", {
            email: sessionStorage.getItem("email"),
            imdbId,
          });
        }
        setWatchList(watchList.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const findMovie = (imdbId) => {
    watchList &&
      watchList.length > 0 &&
      watchList.find((movie) => movie.imdbId === imdbId);
  };
  return (
    <div className="movie-carousel-container">
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        indicators={false}
      >
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div className="movie-card">
                  <ReactPlayer
                    playing={true}
                    muted
                    autoPlay
                    url={movie.trailerLink}
                    width="100%"
                    height="100%"
                  />
                  <div className="movie-detail">
                    <div className="movie-poster"  onClick={() => reviews(movie.imdbId)}>
                      <img src={movie.poster} alt="" />
                      {!findMovie(movie.imdbId) ? (
                        <FontAwesomeIcon
                          size="lg"
                          icon={faHeart}
                          onClick={() => watchListFunc(movie.imdbId)}
                          className="watchlist"
                        />
                      ) : (
                        <FontAwesomeIcon
                          size="lg"
                          icon={faHeart}
                          onClick={() => watchListFunc(movie.imdbId, true)}
                          className="watchlist-selected"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
