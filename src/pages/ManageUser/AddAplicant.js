import React, {  useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const AddApplicant = () => {
 
  const [jobs, setJobs] = useState({
    name: "",
    email: "",
    phone : "" , 
    password :"",
    err: "",
    loading: false,
    success: null,
  });

  

  const createMovie = (e) => {
    e.preventDefault();

    setJobs({ ...jobs, loading: true });

    
    axios
      .post("http://localhost:4000/applicant",  {
        // headers: {
        //    token: auth.token,
        //    "Content-Type": "multipart/form-data",

        // },
        name  : jobs.name , 
        email : jobs.email , 
        phone : jobs.phone ,
        password : jobs.password
      })
      .then((resp) => {
        setJobs({
          name: "",
          email: "",
          phone :"" ,
          password :"" ,
          err: null,
          loading: false,
          success: "Movie Created Successfully !",
        });
        
      })
      .catch((err) => {
        setJobs({
          ...jobs,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Add Applicant</h1>

      {jobs.err && (
        <Alert variant="danger" className="p-2">
          {jobs.err}
        </Alert>
      )}

      {jobs.success && (
        <Alert variant="success" className="p-2">
          {jobs.success}
        </Alert>
      )}

      <Form onSubmit={createMovie}>
        <Form.Group className="mb-3">
          <Form.Control
            value={jobs.name}
            onChange={(e) => setJobs({ ...jobs, name: e.target.value })}
            type="text"
            required
            placeholder="Name"
          />

          <Form.Control
          value={jobs.email}
          className="my-2"
          onChange={(e) => setJobs({ ...jobs, email: e.target.value })}
          type="text"
          required
          placeholder="Email"
        />
          
        </Form.Group>

        

        <Form.Group className="mb-3">
        <Form.Control
            value={jobs.phone}
            onChange={(e) => setJobs({ ...jobs, phone: e.target.value })}
            type="text"
            required
            placeholder="Phone"
            className="my-3"
          />
          <Form.Control
            value={jobs.password}
            onChange={(e) => setJobs({ ...jobs, password: e.target.value })}
            type="text"
            required
            placeholder="Password"
          />

          
        </Form.Group>

        {
          /**
           * <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} required />
        </Form.Group>
           */
        }

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New Jobs
        </Button>
      </Form>
    </div>
  );
};

export default AddApplicant;
