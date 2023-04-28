import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function EditQuiz(){
    const[quizData,setquizData]=useState({
        title:'',
        detail:'',
    });
    const teacherId=localStorage.getItem('teacherId');
    const {quiz_id}=useParams();
    useEffect(()=>{
        document.title='Edit Quiz';
        try{
            axios.get(baseUrl+'/teacher-quiz-detail/'+quiz_id)
            .then((res)=>{ 
                setquizData({
                    title:res.data.title,
                    detail:res.data.detail,
                });           
            });
        }catch(error){
            console.log(error);
        }
      

    },[]);
    
    const handleChange=(event)=>{
           setquizData({
            ...quizData,
            [event.target.name]:event.target.value
    });
}   
const formSubmit=()=>{ 
    const _formData=new FormData();
    _formData.append('teacher',teacherId);
    _formData.append('title',quizData.title);
    _formData.append('detail',quizData.detail);
    try{
        axios.put(baseUrl +'/teacher-quiz-detail/'+ quiz_id,_formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
    .then((res)=>{ 
        // console.log(res.data);
        // window.location.href='/add-course';
        if(res.status==200){
            Swal.fire({
                title: 'Data has been updated',
                icon:'success',
                toast:true,
                timer:3000,
                position:'top-right',
                timerProgressBar:true,
                showConfirmButton:false
            });
             
        }
       
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
                    <h5 className='card-header'>Edit Quiz</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                           <input type="text" value={quizData.title} onChange={handleChange}  name='title' id="title" className="form-control"/>
                        </div>
                      </div>
                        <div className="mb-3 row">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Detail</label>
                        <div className="col-sm-10">
                        <textarea  onChange={handleChange} value={quizData.detail}  name='detail' id="description"  className="form-control"></textarea>
                        </div>
                       </div>
                       <hr></hr>
                         <button  onClick={formSubmit} className='btn btn-primary'>update</button>
                         </form>
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default EditQuiz;

