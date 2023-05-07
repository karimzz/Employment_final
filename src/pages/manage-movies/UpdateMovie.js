import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMovie = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [movie, setMovie] = useState({
    position: "",
    description: "",
    offer: "",
    max_candidate :"",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const image = useRef(null);
 

  const updateMovie = (e) => {
    e.preventDefault();

    setMovie({ ...movie, loading: true });

    

    axios
      .put("http://localhost:4000/job/" + id,  {
        position :movie.position , 
        description :movie.description, 
        offer : movie.offer , 
        max_candidate_number : movie.max_candidate
      })
      .then((resp) => {
        setMovie({
          ...movie,
          loading: false,
          success: "movie updated successfully !",
          reload: movie.reload + 1,
        });
      })
      .catch((err) => {
        setMovie({
          ...movie,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/m" + id)
  //     .then((resp) => {
  //       setMovie({
  //         ...movie,
  //         name: resp.data.name,
  //         description: resp.data.description,
  //         image_url: resp.data.image_url,
  //       });
  //     })
  //     .catch((err) => {
  //       setMovie({
  //         ...movie,
  //         loading: false,
  //         success: null,
  //         err: "Something went wrong, please try again later !",
  //       });
  //     });
  // }, [movie.reload]);

  return (
    <div className="login-container">
      <h1>Update Jobs Form</h1>

      {movie.err && (
        <Alert variant="danger" className="p-2">
          {movie.err}
        </Alert>
      )}

      {movie.success && (
        <Alert variant="success" className="p-2">
          {movie.success}
        </Alert>
      )}

      <Form onSubmit={updateMovie} className="text-center py-2">
        

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Position Name"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, position: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={movie.description}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="text" className="form-control" placeholder="Offer" onChange={(e) =>
            setMovie({ ...movie, offer: e.target.value })
          } />
          <input type="number"  className="form-control my-3" placeholder="Max Candidate offer"
          onChange={(e) =>
            setMovie({ ...movie, max_candidate: e.target.value })
          } />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Jobs
        </Button>
      </Form>
    </div>
  );
};

export default UpdateMovie;
