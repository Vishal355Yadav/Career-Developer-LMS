import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherMycourses(){
    const [courseData,setCourseData]=useState([]);
    const [totalResult,settotalResult]=useState(0);

    const teacherId=localStorage.getItem('teacherId');
    // console.log(teacherId);
    useEffect(()=>{
        document.title='My Courses';
        try{
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
            .then((res)=>{ 
                setCourseData(res.data);
            });
        }catch(error){ 
            console.log(error);
        } 
    },[]);
    // console.log(courseData);
    // console.log("this is me");

    const handleDeleteClick=(course_id)=>{
        Swal.fire({
            title: 'confirm',
            text:'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText:'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try {
                    axios.delete(baseUrl+'/course/'+course_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try {
                            axios.get(baseUrl+'/teacher-course/'+teacherId)
                            .then((res)=>{
                                settotalResult(res.data.length);
                                setCourseData(res.data);
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    })
                } catch (error) {
                    Swal.fire('error','Data has not been deleted');
                }
            }
            else{
                Swal.fire('error','Data has not been deleted');
            }
        })
    }

    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
               <div className='card'>
        <h5 className='card-header'> My Courses</h5>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Total Enrolled</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courseData.map((course,index)=>
                    <tr>
                    <td><Link to={'/all-chapters/'+course.id}>{course.title}</Link>
                    <hr/>
                     {course.course_rating && <span>Rating: {course.course_rating}/5</span>}
                     {!course.course_rating && <span>Rating: 0/5</span>}

                    </td>
                    <td><img src={course.featured_img} width="65" className='rounded img-thumbnail' alt={course.title}/></td>
                    <td><Link to={'/enrolled-students/'+course.id}>{course.total_enrolled_students}</Link></td>
                    <Link className='btn btn-info active btn-sm' to={'/edit-course/'+course.id}>Edit</Link>
                    <Link className='btn btn-success active btn-sm  ms-2' to={'/add-chapter/'+course.id}>Add Chapters</Link>
                    <Link className='btn btn-warning active btn-sm  ms-2' to={'/assign-quiz/'+course.id}>Assign Quiz</Link>
                    <td><button onClick={()=>handleDeleteClick(course.id)}className='btn btn-danger btn-sm  ms-2'>Delete</button></td>
                  
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