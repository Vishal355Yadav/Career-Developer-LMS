import {Link} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import AllCourses from './AllCourses';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function PopularCourses(){

  const [popularcourseData,setpopularCourseData]=useState([]);
  useEffect(()=>{
    document.title='All Popular Courses'; 
  
      try{
        axios.get(baseUrl+'/popular-courses/?all=1 ')
        .then((res)=>{ 
          setpopularCourseData(res.data);
        });
    }catch(error){ 
        console.log(error);
    } 
  
  
  },[]);
    return(
        <div className="container mt-4">
        <h3 className="pb-1 mb-4">Popular Courses</h3>
        <div className="row">
        {popularcourseData && popularcourseData.map((row,index)=>
          <div className="col-md-3">
            <div className="card">
            <Link to={'/CourseDetail/'+row.course.id}><img src={row.course.featured_img} className="card-img-top" alt={row.course.title}/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={'/CourseDetail/'+row.course.id} >{row.course.title}</ Link></h5> 
                <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: {row.rating}/5</span>
                      <span className='float-end'> Views : {row.course.course_views}</span>
                </div>

              </div>
              </div>
            </div>
         
          </div>
            )}
       
        </div>
        {/* paginatioin */}
        <nav aria-label="Page navigation example mt-4">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
        </div>
    );

}
export default PopularCourses;