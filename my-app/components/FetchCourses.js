import React, { useEffect, useState } from 'react'
import { CourseCard } from './CourseCard'
import { subgraphQuery } from '@/utils'
import { FETCH_CREATED_COURSE } from '@/queries'



export const FetchCourses = () => {
    const [courses,setCourses] = useState([])
    const [courseCardArray,setCourseCardArray] = useState([])
    const [data,setData] =useState(null);

    const arr = courses.map((c,id)=>
    {
        return(
            <CourseCard name = {c.name} image = {c.imageUrl} key = {id} id = {c.courseId} price = {c.price}/>
        )
    })

useEffect(() => {
    const fetchData = async () => {
      const res = await subgraphQuery(FETCH_CREATED_COURSE());
    //   const json = await res.json();
    
      setCourses(res.courseCreateds)
      setData(res)
    };
    setCourseCardArray(arr);

    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
      
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [courses]);



  return (
    <div className='flex flex-wrap m-auto mb-48 items-center'>
        {/* {!courses && <h1>Loading....</h1>} */}
        {data?
        courseCardArray:<h1 className='text-lg'>Loading...</h1>}
        {/* {&& <h1>loaded courses</h1>} */}
        {/* {console.log(courses)} */}
    </div>
  )
}
