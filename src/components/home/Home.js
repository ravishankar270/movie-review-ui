import Hero from "../hero/Hero";

const Home = ({ movies, watchList, setWatchList, setOpenLoginModal }) => {
  return (
    <Hero
      movies={movies}
      watchList={watchList}
      setWatchList={setWatchList}
      setOpenLoginModal={setOpenLoginModal}
    />
  );
};

export default Home;
