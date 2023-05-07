import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./../../css/ManageMovies.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageUserPage = () => {
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
      .get("http://localhost:4000/applicant")
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
      .delete("http://localhost:4000/applicant/" + id, {
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
        <h3 className="text-center ">Manage Applicant</h3>
        <Link to={"/manage-user/add"} className="btn btn-success">
          Add New Applicant
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
            <th>Name</th>
            <th> Email</th>
            <th> Password</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {movies.results.map((movie , idx) => (
            <tr key={idx}>
              <td>{movie.id}</td>
              <td>
                <h2  style={{fontSize:"15px"}}>{movie.name}</h2>
              </td>
              <td> {movie.email} </td>
              <td>{movie.password}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    
                    deleteMovie(movie.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"/update/" + movie.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUserPage;
