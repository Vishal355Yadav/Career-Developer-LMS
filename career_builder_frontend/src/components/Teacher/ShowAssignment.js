import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function ShowAssignment(){ 
    const [assignmentData,setassignmentData]=useState([]);
    const [totalResult,settotalResult]=useState([0]);
    const {student_id}=useParams();
    const {teacher_id}=useParams();
    // console.log(teacherId);
    useEffect(()=>{
        document.title='All Courses';
        try{
            axios.get(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id)
            .then((res)=>{ 
                settotalResult(res.data.length); 
                setassignmentData(res.data);
            });
        }catch(error){ 
            console.log(error);
        } 
    },[]);
    // console.log(chapterData);
    // const Swal=require('sweetalert2')

    return(
        <div className="container mt-4 ">
        <div className="row">
           <aside className="col-md-3">
           <TeacherSidebar/>
           </aside>
           <section className='col-md-9'>
           <div className='card'>
    <h5 className='card-header'> All Assignment({totalResult}) <Link className='btn btn-success float-end btn-sm' to={'/add-assignment/'+teacher_id+'/'+student_id}> Add Assignment</Link> </h5>
    <div className='card-body'>
    <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Student status</th>
                    </tr>
                </thead>
                <tbody>
                    {assignmentData.map((row,index)=>
                    <tr>
                    <td>{row.title}</td>
                    <td>
                        { row.student_status==false  && <span className='badge bg-warning'> Pending</span>}
                        {row.student_status==true && <span className='badge bg-success'>Completed</span>}
                    </td>
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
export default ShowAssignment;