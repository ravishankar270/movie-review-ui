import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from "react";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await api.post("/api/v1/review", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3 style={{ color: "gold" }}>{movie?.title}</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} height={"90%"} width="90%" alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <h6 style={{ color: "grey", display: "inline" }}>
                    Release Date :
                  </h6>{" "}
                  {movie?.releaseDate}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 style={{ color: "grey", display: "inline" }}>Genre :</h6>{" "}
                  {movie?.genres?.toString()}
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          <Row>
            <Col>
              <h5 style={{ color: "grey" }}>Reviews :</h5>
            </Col>
          </Row>
          <Row>
            <Col>{!reviews || reviews?.length === 0 ? "No Reviews" : null}</Col>
          </Row>
          {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>
                    <i>{r.body}</i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <ReviewForm
            handleSubmit={addReview}
            revText={revText}
            labelText="Write a Review?"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
