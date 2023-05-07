import React, { useState, useEffect } from "react";
import "../../css/MovieDetails.css";
import ReviewMovie from "../../components/ReviewMovie";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import Form from "react-bootstrap/Form";
import Overlay from "./Overlay";
import FormRequest from "./FormRequest";

const MovieDetails = () => {
  let { id } = useParams();
  const [show , setShow] = useState(false) ; 
  const auth = getAuthUser();
  const [movie, setMovie] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });

  const [review, setReview] = useState({
    review: "",
    loading: false,
    err: null,
  });

  // useEffect(() => {
  //   setMovie({ ...movie, loading: true });
  //   axios
  //     .get("http://localhost:4000/job/" + id)
  //     .then((resp) => {
  //       setMovie({ ...movie, result: resp.data, loading: false, err: null });
  //     })
  //     .catch((err) => {
  //       setMovie({
  //         ...movie,
  //         loading: false,
  //         err: " something went wrong, please try again later ! ",
  //       });
  //     });
  // }, [movie.reload]);

  // const sendReview = (e) => {
  //   e.preventDefault();
  //   setReview({ ...review, loading: true });
  //   axios
  //     .post(
  //       "http://localhost:4000/movies/review",
  //       {
  //         movie_id: id,
  //         review: review.review,
  //       },
  //       {
  //         headers: {
  //           token: auth.token,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       setReview({ err: null, review: "", loading: false });
  //       setMovie({ ...movie, reload: movie.reload + 1 });
  //     })
  //     .catch((errors) => {
  //       setReview({ ...review, loading: false });
  //     });
  // };

  let data = localStorage.getItem("jobDes") ;
  data = JSON.parse(data) ;
  console.log(data) ;

  return (
    <div className="movie-details-container p-5" >
    <Overlay show={show} setShow={setShow} />
    <FormRequest show={show} setShow={setShow} id= {id}></FormRequest>
      <div className="container k-container">
        <div className="card">
        <h1>{data.position}</h1>
        <p className="offer">{data.offer}</p>
        <p className="des">
          {data.description}
        </p>
        <button className="btn btn-success" onClick={()=>{setShow(!show)}}> Enroll Now</button>
        </div>
      </div>
      {/* Loader  */}
      

      
    </div>
  );
};

export default MovieDetails;
