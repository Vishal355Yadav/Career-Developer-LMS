import Sidebar from './Sidebar';
import {Link,useParams} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function Dashboard(){
  const [dashboardData,setdashboardData]=useState([]);
  const [studentData,setstudentData]=useState([]);
  const studentId=localStorage.getItem('studentId');
   useEffect(()=>{
        document.title='Dashboard';
        try{
            axios.get(baseUrl+'/student/dashboard/'+ studentId)
            .then((res)=>{ 
                console.log(res);
                setdashboardData(res.data);
            });
        }catch(error){ 
            console.log(error);
        }
        try{
            axios.get(baseUrl+'/student/'+ studentId)
            .then((res)=>{ 
                setstudentData(res.data);
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
               <div className="container">
            <h6>Welcome,</h6>
            <h3 className="mb-1">{studentData.full_name}</h3>
            <br></br>
            <br></br>
           
        </div>
               <div className='row'>
               <div className='col-md-4'>
        <div className='card border-primary'>
            <h5 className='card-header bg-primary text-white'>Enrolled Courses</h5>
            <div className='card-body'>
              <h3><Link to="/my-courses">{dashboardData.enrolled_courses}</Link></h3>
            </div>
        </div>
        </div>
                <div className='col-md-4'>
        <div className='card border-success'>
            <h5 className='card-header bg-success text-white'>FavoriteCourses Courses</h5>
            <div className='card-body'>
              <h3><Link to='/favorite-courses'>{dashboardData.favorite_courses}</Link></h3>
            </div>
        </div>
        </div>
            <div className='col-md-4'>
        <div className='card border-info'>
            <h5 className='card-header bg-info text-white'>Assignments</h5>
            <div className='card-body'>
              <h5>
              <Link to='/my-assignments'> Completed: {dashboardData.complete_assignments}, Pending: {dashboardData.Pending_assignments}</Link> 
              </h5>
            </div>
        </div>
        </div>


        </div>
               </section>
            </div>
        </div>
    );
}
export default Dashboard;