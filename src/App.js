import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/Login/Login";
import WatchList from "./components/WatchList/WatchList";
import axios from "./api/axiosConfig"; 

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [auth, setAuth] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [watchList, setWatchList] = useState([]);
  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
    const email = sessionStorage.getItem("email");
    email && setAuth(true);
    const getWatchlist = async () => {
      if (email) {
        const watchList = await axios.get(`/api/v1/user/${email}`);
        setWatchList(watchList.data);
      }
    };
    getWatchlist();
  }, []);

  const login = () => {
    setOpenLoginModal(true);
  };

  const logout = () => {
    sessionStorage.removeItem("email");
    setWatchList([]);
    setAuth(false);
  };

  return (
    <div className="App">
      <Header auth={auth} login={login} logout={logout} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                watchList = {watchList}
                setWatchList={setWatchList}
                setOpenLoginModal={setOpenLoginModal}
              />
            }
          ></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchList={watchList}
                auth={auth}
                setOpenLoginModal={setOpenLoginModal}
              />
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
      <Login
        open={openLoginModal}
        auth={auth}
        setAuth={setAuth}
        setWatchList={setWatchList}
        setOpenLoginModal={setOpenLoginModal}
      />
    </div>
  );
}

export default App;
