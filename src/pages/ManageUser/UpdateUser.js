import React, { useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  let { id } = useParams();
//   const auth = getAuthUser();
  const [movie, setMovie] = useState({
    name: "",
    email: "",
    password: "",
    phone :"",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
 

  const updateMovie = (e) => {
    e.preventDefault();

    setMovie({ ...movie, loading: true });

    axios
      .put("http://localhost:4000/applicant/" + id,  {
        name :movie.name , 
        email :movie.email, 
        phone : movie.phone , 
        password : movie.password
      })
      .then((resp) => {
        setMovie({
          ...movie,
          loading: false,
          success: "User updated successfully !",
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
      <h1>Update Applicant</h1>

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
                placeholder="Name"
                value={movie.name}
                onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            />

            <Form.Control
                type="text"
                placeholder="Email"
                className="my-2"
                value={movie.email}
                onChange={(e) => setMovie({ ...movie, email: e.target.value })}
            />

            <Form.Control
                type="text"
                placeholder="Password"
                className="my-2"
                value={movie.password}
                onChange={(e) => setMovie({ ...movie, password: e.target.value })}
            />

            <Form.Control
                type="text"
                placeholder="Phone"
                className="my-2"
                value={movie.phone}
                onChange={(e) => setMovie({ ...movie, phone: e.target.value })}
            />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Applicant
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
