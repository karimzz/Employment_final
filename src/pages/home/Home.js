import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "./../../css/Home.css"
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";

const Home = () => {
  const [movies, setMovies] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  let [originalData , setOriginalData] =useState([]) ;

  const dataAboutJobs = {} ;
    const saveDataAboutJob = (id , position , offer , description )=>{
      const data = {
        id ,
        position,
        offer,
        description
      }

      localStorage.setItem("jobDes" , JSON.stringify(data))

    }
    

  const [searchPrediction, setSearchPredicition] = useState(false);
  

  useEffect(() => {
    setMovies({ ...movies, loading: true });
    axios
      .get("http://localhost:4000/job", {
       
      })
      .then((resp) => { 
        setOriginalData(resp.data)
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

  const searchMovies = (e) => {
    e.preventDefault();
    setMovies({ ...movies, reload: movies.reload + 1 });
  };

  return (
    <div className="home-container p-5">

    
    
      {/* Loader  */}
      {movies.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST MOVIES  */}
      {movies.loading === false && movies.err == null && (
        <>
          {/* Filter  */}

            <SearchComponent movie={movies} originalData = {originalData} setMovies={setMovies} searchPrediction={searchPrediction} setSearchPredicition={setSearchPredicition} />

          {/* LIST MOVIES  */}
            {/* Write Code Here */ }
            <div className="container k-cotnainer">
              
              {
                  movies.results.map((item)=>{
                    return (
                    <div className="card" key={item.id}>
                        <h3>{item.position}</h3>
                        <p>{item.offer}</p>
                        <p className="des">
                          {item.description}
                        </p>
                        <Link className="" to={"/" + item.id} style={{textDecoration:"none"}}>
                            <button className="btn btn-success" onClick={()=>{saveDataAboutJob(item.id , item.position ,item.offer ,item.description )}}>See More</button>
                          </Link>
                    </div>
                    )
                  })
              }
            </div>

        </>
      )}

      {/* ERRORS HANDLING  */}
      {movies.loading === false && movies.err != null && (
        <Alert variant="danger" className="p-2">
          {movies.err}
        </Alert>
      )}

      {movies.loading === false &&
        movies.err == null &&
        movies.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Movies, please try again later !
          </Alert>
        )}
    </div>
  );
};

export default Home;
