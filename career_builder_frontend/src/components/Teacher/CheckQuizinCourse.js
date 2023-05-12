import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function CheckQuizinCourse(props) {
    const [quizData,setquizData]=useState([]);
    // const {course_id}=useParams();

    const teacherId=localStorage.getItem('teacherId');
    useEffect(()=>{
        document.title='Check Quizes In Course';
        try{
            axios.get(baseUrl+`/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res)=>{ 
                setquizData(res.data);
            });
        }catch(error){ 
            console.log(error);
        }
    },[]);
    const assignQuiz=(quiz_id)=>{
        const _formData=new FormData();
        _formData.append('teacher',teacherId);
        _formData.append('course',props.course);
        _formData.append('quiz',props.quiz);
        try{
            axios.post(baseUrl+'/quiz-assign-course/',_formData,{
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
    console.log(props)
    console.log(quizData)
  return (
    <td>
        {quizData.bool==false &&
          
            <button onClick={()=>assignQuiz(props.quiz)} className='btn btn-success btn-sm ms-2'>Assign Quiz</button>
        }

        {quizData.bool==true &&
        <span className='text-success'>Assigned</span>
        } 
    </td>
  )
}

export default CheckQuizinCourse