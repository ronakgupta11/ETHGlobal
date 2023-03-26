import React from 'react'
import Link from 'next/link'

export const CourseCard = (props) => {
  function handleEnroll(id){
    

  }

  return (
    <div className='bg-primary rounded-md h-80 m-10 flex flex-col items-center'>
    <img className='m-5 w-100' src={props.image}>
    
    </img>
    <Link className='italic' href="/display/123">
    {props.name}
    
    </Link>
    <div className='flex '>

    <button  onClick ={() => handleEnroll(props.id)} className="bg-base-100 m-3 btn btn-sm rounded-btn">Enroll</button>
    <button className="bg-base-100 m-3 btn btn-sm rounded-btn">Open</button>
    </div>
    
</div>
  )
}
