import {Link} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import AllCourses from './AllCourses';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function PopularTeacher(){
   const [teacher,setTeacher]=useState(null);
   const [popularteacherData,setpopularTeacherData]=useState([]);
    useEffect(()=>{
        document.title='Popular Teachers';
        axios.get(baseUrl+'/teacher/').then((response)=>{
          setTeacher(response.data);
        });

        try{
          axios.get(baseUrl+'/popular-teachers/?popular=1 ')
          .then((res)=>{ 
            setpopularTeacherData(res.data);
          });
      }catch(error){ 
          console.log(error);
      }
    },[]);
    console.log(teacher);
    return(
        <div className="container mt-4">
        <h3 className="pb-1 mb-4">Popular Teachers</h3>
        <div className="row">
        {popularteacherData && popularteacherData.map((teacher,index)=>
          <div className="col-md-3">
            <div className="card">
            <Link to={'/teacher-detail/'+teacher.id}  ><img src={teacher.profile_img} className="card-img-top" alt={teacher.full_name}/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={'/teacher-detail/'+teacher.id} >{teacher.full_name}</ Link></h5>       
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Total Courses: {teacher.total_teacher_courses}</span>                    
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
export default PopularTeacher;