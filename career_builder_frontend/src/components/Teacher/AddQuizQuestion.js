// import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddQuizQuestion(){

    const[questionData,setQuestionData]=useState({
        quiz:'',
        quesiton:'', 
         ans1:'',
         ans2:'',
         ans3:'',
         ans4:'',
         right_ans:''
    });
  

    useEffect(()=>{
        document.title='Add Chapter'; 
    },[]);
    
    const handleChange=(event)=>{
        setQuestionData({
            ...questionData,
            [event.target.name]: event.target.value
    });
}
const {quiz_id}=useParams();
const formSubmit=()=>{ 
    const _formData=new FormData();
   
    _formData.append('quiz',quiz_id);
    _formData.append('quesiton',questionData.quesiton);
    _formData.append('ans1',questionData.ans1);
    _formData.append('ans2',questionData.ans2);
    _formData.append('ans3',questionData.ans3);
    _formData.append('ans4',questionData.ans4);
    _formData.append('right_ans',questionData.right_ans);
    try{
        axios.post(baseUrl+'/quiz-questions/',quiz_id_formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
    .then((res)=>{
        // console.log(res.data);
        if(res.status==200|| res.status==201){
            Swal.fire({
              title:'chapter has been added',
              icon: 'success',
              toast:true,
              timer:5000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            })
  
            window.location.reload();
          }
        window.location.href='/add-chapter/1';
       
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
                    <h5 className='card-header'>Add Quiz</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Tittle</label>
                        <input type="text" onChange={handleChange}  name='title' className="form-control"  id="title"/>
                    </div>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Ans1</label>
                        <input type="text" onChange={handleChange}  name='ans1' className="form-control"  id="title"/>
                    </div>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Ans2</label>
                        <input type="text" onChange={handleChange}  name='ans2' className="form-control"  id="title"/>
                    </div>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Ans3</label>
                        <input type="text" onChange={handleChange}  name='ans3' className="form-control"  id="title"/>
                    </div>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Ans4</label>
                        <input type="text" onChange={handleChange}  name='ans4' className="form-control"  id="title"/>
                    </div>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Right Answer</label>
                        <input type="text" onChange={handleChange}  name='right_ans' className="form-control"  id="title"/>
                    </div>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Tittle</label>
                        <input type="text" onChange={handleChange}  name='title' className="form-control"  id="title"/>
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
export default AddQuizQuestion;