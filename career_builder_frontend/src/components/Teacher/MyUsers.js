import {Link,useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function MyUsers(){
    const [studentData,setstudentData]=useState([]);
    // let {teacher_id}=useParams();
    const teacherId=localStorage.getItem('teacherId');

    // console.log(teacherId);
    useEffect(()=>{
        document.title='My Courses';
        try{
            axios.get(baseUrl+'/fetch-all-enrolled-students/'+ teacherId)
            .then((res)=>{ 
                setstudentData(res.data);
            });
        }catch(error){ 
            console.log(error);
        } 
    },[]);
    // console.log(courseData);
    // console.log("this is me");
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
               <div className='card'>
        <h5 className='card-header'> Enrolled Student list</h5>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Interested Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((row,index)=>
                    <tr>
                    {/* <td><Link to={'/view-student/'+row.student.id}>{row.student.full_name}</Link></td> */}
                    <td>{row.student.full_name}</td>
                    <td>{row.student.email}</td>
                    <td>{row.student.username}</td>
                    <td>{row.student.interested_categories}</td>
                    
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
export default MyUsers;