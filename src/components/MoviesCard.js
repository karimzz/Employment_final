import React from "react";
import Card from "react-bootstrap/Card";
import "../css/MovieCard.css";
import { Link } from "react-router-dom";

const MoviesCard = (props) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> {props.name} </Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Link className="btn btn-dark w-100" to={"/" + props.id}>
            Apply Now
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MoviesCard;
