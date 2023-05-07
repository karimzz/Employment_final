import React from 'react'
import FormRequest from './FormRequest'

const Overlay = ({show, setShow}) => {

    console.log(show.show)

  return (
    
    <div className='overlay' onClick={()=>{setShow(!show)}}  style={{display:`${show?"flex" :"none"}`}}>
      
    </div>
  )
}

export default Overlay
