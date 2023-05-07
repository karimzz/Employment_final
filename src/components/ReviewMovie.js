import React from "react";

const ReviewMovie = (props) => {
  return (
    <div className="review-container">
      <p> {props.review} </p>
    </div>
  );
};

export default ReviewMovie;
