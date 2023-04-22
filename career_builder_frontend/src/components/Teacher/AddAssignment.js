// import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddAssignment(){

    const[assignmentData,setassignmentData]=useState({
        title:'',
        detail:''
    });
  

    useEffect(()=>{
        document.title='Add Assignment'; 
    },[]);
    
    const handleChange=(event)=>{
           setassignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value
    });
}   
const {student_id}=useParams();
const {teacher_id}=useParams();
const formSubmit=()=>{ 
    const _formData=new FormData();
   
    _formData.append('teacher',teacher_id);
    _formData.append('title',assignmentData.title);
    _formData.append('detail',assignmentData.detail);
    _formData.append('student',student_id);
    try{
        axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id,_formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
    .then((res)=>{
        // console.log(res.data);
        if(res.status==200|| res.status==201){
            Swal.fire({
              title:'assignment has been added',
              icon: 'success',
              toast:true,
              timer:5000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            })
  
            window.location.reload();
          }
        window.location.href='/add-assignment/1/1';
       
    });
}catch(error){
    console.log(error);
}

};
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
                    <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
                 <div className='card'>
                    <h5 className='card-header'>Add Assignment</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Title</label>
                        <input type="text" onChange={handleChange}  name='title' className="form-control"  id="title"/>
                    </div>
                        <div className="mb-3 row">
                        <label for="detail" className="col-sm-2 col-form-label" >Description</label>
                        <div className="col-sm-10">
                        <textarea onChange={handleChange} name='detail' className="form-control"  id="detail"></textarea>
                        </div>
                       </div>
                    
                       <hr></hr>
                         <button type='button' onClick={formSubmit} className='btn btn-primary'>update</button>
                         </form>
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default AddAssignment;