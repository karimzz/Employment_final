import React, {  useRef, useState } from 'react'
import "./../../css/Home.css"
import axios from 'axios';

const SearchComponent = (props) => {

  let  data = localStorage.getItem("user") ; 
  data = JSON.parse(data) ; 

  
  const [history , setHistory]  = useState([]) ; 

  const searchBar = useRef(null) ;


  const searchFun = async ()=>{
    await axios.get('http://localhost:4000/show', {
      headers: {
        token : data.token
      },data:{
        search :searchBar.current.value
      }
    })
    .then(response => {
      setHistory(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const searchForHistory =async ()=>{
    await axios.get('http://localhost:4000/show/history', {
      headers: {
        token : data.token
      }
    })
    .then(response => {
      setHistory(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const originalData = props.originalData

  

  const filterHandler = ()=>{

    if(searchBar.current.value.length ===0)
    {
      props.setMovies({...props.movie , results:props.originalData,loading: false, err: null})
    }else{
      props.setMovies({...props.movie , results:props.originalData,loading: false, err: null})
      const copy = props.movie.results ;
    
    const newArr =copy.filter((item)=>item.position.toLowerCase().includes(searchBar.current.value.toLowerCase()))
    props.setMovies({...props.movie , results:newArr,loading: false, err: null})
    }
    
    
    
    
  }


  return (
    <div className='container k-main'>
        <div className='k-search-bar'>
            <input ref={searchBar} placeholder='Search For Job...' onChange={filterHandler}  onClick={()=>{searchForHistory()}} onFocus={()=>props.setSearchPredicition(!props.searchPrediction)} onBlur={()=>props.setSearchPredicition(!props.searchPrediction)}  />
            <button className='btn rounded-1 btn-success' onClick={()=>{searchFun()}} >Search</button>
        </div>
        <ul className='k-predicition' style={{display:`${props.searchPrediction? "block":"none"}`}}>
            {
              history.map((item)=>{
                return(
                <li  key={item.id}>{item.keyword}</li>)
              })
            }
        </ul>
    </div>
  )
}

export default SearchComponent
