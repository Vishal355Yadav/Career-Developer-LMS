import {Link} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function CheckQuizStatusforStudent(props) {
    const [quizData,setquizData]=useState([]);
    // const {course_id}=useParams();

    const studentId=localStorage.getItem('studentId');
    useEffect(()=>{
        document.title='Check Quizes In Course';
        try{
            axios.get(baseUrl+`/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((res)=>{ 
                setquizData(res.data);
            });
        }catch(error){ 
            console.log(error);
        }
    },[]);
    
  return (
    <td>
         {quizData.bool==false &&
          
          <Link to={'/take-quiz/'+ props.quiz} className='btn btn-success btn-sm ms-2'>Take Quiz</Link>
      }

      {quizData.bool==true &&
      <span className='text-success'>Attempted</span>
      } 
    </td>
  )
}

export default CheckQuizStatusforStudent