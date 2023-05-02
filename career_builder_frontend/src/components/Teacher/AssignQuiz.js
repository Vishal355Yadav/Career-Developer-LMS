import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import CheckQuizinCourse from './CheckQuizinCourse';

const baseUrl='http://127.0.0.1:8000/api';
function TeacherMycourses(){
    const [courseData,setcourseData]=useState([]);
    const [quizData,setquizData]=useState([]);
    const [assignStatus,setassignStatus]=useState();
    const {quiz_id}=useParams();
    const [totalResult,settotalResult]=useState(0);
    const teacherId=localStorage.getItem('teacherId');
    const {course_id}=useParams();

    // console.log(teacherId);
    useEffect(()=>{
        document.title='My Quizes';
        try{
            axios.get(baseUrl+'/teacher-quiz/'+teacherId)
            .then((res)=>{ 
                setquizData(res.data);
            });
        }catch(error){ 
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
              // console.log(res);
              setcourseData(res.data);              
            });
          }
          catch(error){
            console.log(error);
          }

          try{
            axios.get(baseUrl+'/fetch-assign-status/'+ teacherId +'/'+quiz_id)
            .then((res)=>{
              console.log(res);
              if(res.data.bool==true){
                setassignStatus('success');
              }
              
            });
          }
          catch(error){
            console.log(error);
          }
    },[]);
    // console.log(courseData);
    // console.log("this is me");
    const assignQuiz=(quiz_id)=>{
        const _formData=new FormData();
        _formData.append('teacher',teacherId);
        _formData.append('course',course_id);
        _formData.append('quiz',quiz_id);
        try{
            axios.post(baseUrl+'/student-assign-course/',_formData,{
                headers:{
                    'content-type': 'multipart/form-data'
                }
            })
        .then((res)=>{
           if(res.status===200 || res.status===201){
            Swal.fire({
              title: 'Quiz has been successfully assigned',
              icon:'success',
              toast:true,
              timer: 5000,
              position: 'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            });
            window.location.reload();
           }           
        });
      }catch(error){
        console.log(error);
      }
      }
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
               <div className='card'>
        <h5 className='card-header'> Assign Quiz <span className='text-primary'>({courseData.title})</span></h5>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {/* {console.log(quizData)} */}
                    {quizData.map((row,index)=>
                    
                    <tr>
                    <td><Link to={'/all-questions/'+row.id}>{row.title}</Link>
                    <hr/>
                    </td>
                    <CheckQuizinCourse quiz={row.id} course={course_id}/>
                  </tr>
                    )} 
                </tbody>
            </table>
        </div>
    </div>   
               </section>
            </div>
        </div>
    );
}
export default TeacherMycourses;