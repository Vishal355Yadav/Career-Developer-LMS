import {Link} from 'react-router-dom';
import axios from 'axios';
import  {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';  //to get id of the course which help to fetch form database

const baseUrl='http://127.0.0.1:8000/api';

function TeacherSkillCourses(){
  const [courseData,setcourseData]=useState([]);
  const {category_slug}=useParams();
  useEffect(()=>{
      try{
        axios.get(baseUrl+'/course/?category='+category_slug)
        .then((res)=>{
          // console.log(res);
          setcourseData(res.data);
        });
      }
      catch(error){
        console.log(error);
      }
      document.title='All courses';
  },[]);
    return(
        <div className="container mt-4">
        <h3 className="pb-1 mb-4">{category_slug}</h3>
        <div className="row">
        {courseData && courseData.map((course,index)=>
          <div className="col-md-3 mb-4">
            <div className="card">
            <Link to={'/CourseDetail/'+course.id} ><img src={course.featured_img} className="card-img-top" alt={course.title}/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={'/CourseDetail/'+course.id} >{course.title}</ Link></h5>        
              </div>
            </div>
          </div>
          )}
        </div>
        {/* paginatioin */}
        {/* <nav aria-label="Page navigation example mt-4"> */}
  {/* <ul className="pagination justify-content-center"> */}
    {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
  {/* </ul>
</nav> */}
        </div>
    );

}
export default CategoryCourses;