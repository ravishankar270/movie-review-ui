import { Comment } from "react-loader-spinner";
import Hero from "../hero/Hero";

const Home = ({
  movies,
  watchList,
  setWatchList,
  setOpenLoginModal,
  loading,
}) => {
  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div>
  ) : (
    <Hero
      movies={movies}
      watchList={watchList}
      setWatchList={setWatchList}
      setOpenLoginModal={setOpenLoginModal}
    />
  );
};

export default Home;
