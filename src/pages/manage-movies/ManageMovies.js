import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/ManageMovies.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageMovies = () => {
  const auth = getAuthUser();
  const [movies, setMovies] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setMovies({ ...movies, loading: true });
    axios
      .get("http://localhost:4000/job")
      .then((resp) => {
        setMovies({ ...movies, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMovies({
          ...movies,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [movies.reload]);

  const deleteMovie = (id) => {
    axios
      .delete("http://localhost:4000/job/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setMovies({ ...movies, reload: movies.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Jobs</h3>
        <Link to={"add"} className="btn btn-success">
          Add New Jobs +
        </Link>
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>

      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Position</th>
            <th> Offer</th>
            <th> Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.results.map((movie , idx) => (
            <tr key={idx}>
              <td>{movie.id}</td>
              <td>
                <h2  style={{fontSize:"15px"}}>{movie.position}</h2>
              </td>
              <td> {movie.offer} </td>
              <td>{movie.description}</td>
              <td className="" style={{width:"230px"}}>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    
                    deleteMovie(movie.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + movie.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                <Link to={"/" + movie.id} className="btn btn-sm btn-info">
                  show
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageMovies;
