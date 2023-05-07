import axios from 'axios';
import React, {  useRef } from 'react'

const FormRequest = ({show , setShow , id}) => {
    
    let data = localStorage.getItem("user") ;
    data = JSON.parse(data) ; 
    const Qululification = useRef(null)

    const sendQualification = async (e)=>{
        e.preventDefault()
        await axios.post(`http://localhost:4000/request/${id}`, 
        {
            user_id :data.id,
            qualification :Qululification.current.value
        }
        )
        .then( (response)=> {
            // Handle the successful response
            console.log(response.data);
        })
        .catch( (error) => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
    }

  return (
    <form onSubmit={(e)=>{sendQualification(e)}} className='k-form' style={{display :`${show ? "block" : "none"}`}}>
            <div className='f-k'>
            <h2>Requiremnt</h2>
            <input ref={Qululification} placeholder='Enter Requirment' /></div>
            <button onClick={()=>{setShow(!show)}}> Send </button>
    </form>
  )
}

export default FormRequest
