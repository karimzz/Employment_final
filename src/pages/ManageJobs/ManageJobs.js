import axios from 'axios';
import React, { useRef } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageJobs = () => {

    const searchRef = useRef(null) ;
    let  data = localStorage.getItem("user") ; 
  data = JSON.parse(data) ; 

    // const showApplicantForJobHandler = async ()=>{
    //     await axios.get("http://localhost:4000/show/showRequests" ,
    //     {
    //         user_id :"33"
    //     }, 
    //     ).then((res)=>{
    //         console.log(res.data)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // }

    // Second Code 
    
    const showApplicantForJobHandler = async ()=>{
        await axios.get('http://localhost:4000/show/showRequests', {
            data :{
                user_id : searchRef.current.value
            }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error);
        });
      }

    

  return (
    <div className='container ' style={{minHeight : "100vh"}}>
    <div className='d-flex my-5'>
        <input className='form-control' ref={searchRef} style={{width :"200px"}} placeholder='Enter User ID' />
        <button onClick={showApplicantForJobHandler} className='btn btn-success mx-3 ' style={{width :"100px"}}>Search</button>
    </div>
    <Table striped bordered hover>
    
    <thead>
      <tr>
        <th>User ID</th>
        <th>Job ID</th>
        <th> qualification</th>
        <th> Accept Or Decline</th>
      </tr>
    </thead>
    <tbody>
        <tr >
          <td></td>
          <td></td>
          <td> </td>
          <td>
            <button
              className="btn btn-sm btn-success"
              >Accept
              
            </button>
            <Link
              to={"/update/" + 5}
              className="btn btn-sm btn-danger mx-2">
              Decline
            </Link>
            
          </td>
        </tr>
      
    </tbody>
  </Table>
    </div>
  )
}

export default ManageJobs
