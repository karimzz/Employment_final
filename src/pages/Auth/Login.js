import React, {  useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/Login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const Login = () => {


  // Karim Varibale
  const email = useRef(null) ;
  const password = useRef(null) ; 


  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };


  

  // const loginAPI = async (email , password)=>{
  //   const Response = await axios(`https://api.themoviedb.org/3/movie/1?api_key=2ce92bb2247fcf0906d3f32fa61579ad&language=en-US`)
  //   console.log(Response.data) ; 
  // }

  // const loginKarimzz =  async (e)=>{

    
  //   e.preventDefault() ; 
  //   console.log(e)
  //   console.log("ADde")
  // }


  return (
    <div className="login-container">
      <h1>Login Form</h1>

      {login.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}

      <Form onSubmit={(e)=>{LoginFun(e)}} >
        <Form.Group className="mb-3">
          <Form.Control ref={email}
            type="email"
            placeholder="Email"
            required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control 
            ref={password}
            type="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={login.loading === true}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
