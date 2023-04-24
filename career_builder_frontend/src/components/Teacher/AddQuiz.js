import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddQuiz(){
    const[quizData,setquizData]=useState({
        title:'',
        detail:'',
    });
    
    const handleChange=(event)=>{
           setquizData({
            ...quizData,
            [event.target.name]: event.target.value
    });
}   
const formSubmit=()=>{ 
    const teacherId=localStorage.getItem('teacherId');
    const _formData=new FormData();
    _formData.append('teacher',teacherId);
    _formData.append('title',quizData.title);
    _formData.append('detail',quizData.detail);
    try{
        axios.post(baseUrl+'/quiz/',_formData,{
        })
    .then((res)=>{
        // console.log(res.data);
        
        window.location.href='/add-quiz';
       
    });
}catch(error){
    console.log(error);
}

};
//    console.log(cats);
//    console.log(courseData);
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
                    <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
                 <div className='card'>
                    <h5 className='card-header'>Add Quiz</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Tittle</label>
                        <div className="col-sm-10">
                           <input type="text" onChange={handleChange}  name='title' id="title" className="form-control"/>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label htmlFor="detail" className="col-sm-2 col-form-label">Detail</label>
                        <div className="col-sm-10">
                        <textarea  onChange={handleChange} name='detail' id="detail"  className="form-control"></textarea>
                        </div>
                       </div>
                    
                       <hr></hr>
                         <button type="button" onClick={formSubmit} className='btn btn-primary'>Submit</button>
                         </form>
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default AddQuiz;

