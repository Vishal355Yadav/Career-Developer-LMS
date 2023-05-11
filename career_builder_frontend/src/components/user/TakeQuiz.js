import Sidebar from './Sidebar';
import {Link,useParams} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function TakeQuiz(){
	const [courseData,setcourseData]=useState([]);
	const studentId=localStorage.getItem('studentId');
   useEffect(()=>{
        document.title='My Courses';
        try{
            axios.get(baseUrl+'/fetch-enrolled-courses/'+ studentId)
            .then((res)=>{ 
                setcourseData(res.data);
            });
        }catch(error){ 
            console.log(error);
        }
    },[]);
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <Sidebar/>
               </aside>
               <section className='col-md-9'>
               <h4 className='mb-3 border-bottom pb-1'>Quiz Title</h4>
               <div className='card'>
        <h5 className='card-header'>Question Title</h5>
        <div className='card-body'>
        
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                	
                	<tr>
	                    <td><input type='radio'></input></td>
                        <th>Option 1</th>
	                </tr>
                    <tr>
	                    <td><input type='radio'></input></td>
                        <th>Option 1</th>
	                </tr>
                    <tr>
	                    <td><input type='radio'></input></td>
                        <th>Option 1</th>
	                </tr>
                    <tr>
	                    <td><input type='radio'></input></td>
                        <th>Option 1</th>
	                </tr>
                </tbody>
            </table>
            <button className='btn btn-dark'> Skip</button>
            <button className='btn btn-primary ms-2'> Submit</button>
        </div>

    </div>   
               </section>
            </div>
        </div>
    );
}
export default TakeQuiz;