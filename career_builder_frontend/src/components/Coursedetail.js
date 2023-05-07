import {Link} from 'react-router-dom';
import axios from 'axios';
import  {useEffect,useState} from 'react';
import Swal from 'sweetalert2';
import {useParams} from 'react-router-dom';  //to get id of the course which help to fetch form database
const siteUrl='http://127.0.0.1:8000';
const baseUrl='http://127.0.0.1:8000/api';

function CourseDetail(){
  const [courseData,setcourseData]=useState([]);
  const [chapterData,setchapterData]=useState([]);
  const [courseViews,setcourseViews]=useState(0);
  const [teacherData,setteacherData]=useState([]);
  const [relatedcourseData,setrelatedcourseData]=useState([]);
  const [techListData,settechListData]=useState([]);
  const [userLoginStatus,setuserLoginStatus]=useState();
  const [enrollStatus,setenrollStatus]=useState();
  const [ratingStatus,setratingStatus]=useState();
  const [AvgRating,setAvgRating]=useState(0);
  const [favoriteStatus,setfavoriteStatus]=useState();

  let {course_id}=useParams(); 
  const studentId=localStorage.getItem('studentId');
  // console.log({course_id} + "hello");
  useEffect(()=>{
    try{
      axios.get(baseUrl+'/course/'+course_id)
      .then((res)=>{
        // console.log(res);
        setcourseData(res.data);
        setchapterData(res.data.course_chapters);
        setteacherData(res.data.teacher);
        setrelatedcourseData(JSON.parse(res.data.related_videos));
        settechListData(res.data.tech_list);
        if(res.data.course_rating!='' && res.data.course_rating!=null){
          setAvgRating(res.data.course_rating)
        }
      });
      axios.get(baseUrl+'/update-view/'+course_id)
      .then((res)=>{
       setcourseViews(res.data.views)
      });

    }
    catch(error){
      console.log(error);
    }
    document.title='Course Detail';

    try{
      axios.get(baseUrl+'/fetch-enroll-status/'+ studentId +'/'+course_id)
      .then((res)=>{
        console.log(res);
        if(res.data.bool==true){
          setenrollStatus('success');
        }
        
      });
    }
    catch(error){
      console.log(error);
    }

    // rating status
    try{
      axios.get(baseUrl+'/fetch-rating-status/'+ studentId +'/'+course_id)
      .then((res)=>{
        console.log(res);
        if(res.data.bool==true){
          setratingStatus('success');
        }
        
      });
    }
    catch(error){
      console.log(error);
    }

    try{
      axios.get(baseUrl+'/fetch-favorite-status/'+ studentId +'/'+course_id)
      .then((res)=>{
        console.log(res);
        if(res.data.bool==true){
          setfavoriteStatus('success');
        }else{
          setfavoriteStatus('');
        }
        
      });
    }
    catch(error){
      console.log(error);
    }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
      setuserLoginStatus('success');
    }
  },[]);

const enrollCourse=()=>{
  const studentId=localStorage.getItem('studentId');
  const _formData=new FormData();
  _formData.append('course',course_id);
  _formData.append('student',studentId);
  try{
      axios.post(baseUrl+'/student-enroll-course/',_formData,{
          headers:{
              'content-type': 'multipart/form-data'
          }
      })
  .then((res)=>{
     if(res.status===200 || res.status===201){
      Swal.fire({
        title: 'You have successfully enrolled in this course',
        icon:'success',
        toast:true,
        timer: 5000,
        position: 'top-right',
        timerProgressBar:true,
        showConfirmButton:false
      });
      setenrollStatus('success');
     }
     
  });
}catch(error){
  console.log(error);
}
}

const markAsFavorite=()=>{
  const studentId=localStorage.getItem('studentId');
  const _formData=new FormData();
  _formData.append('course',course_id);
  _formData.append('student',studentId);
  _formData.append('status',true);
  try{
      axios.post(baseUrl+'/student-add-favorite-course/',_formData,{
          headers:{
              'content-type': 'multipart/form-data'
          }
      })
  .then((res)=>{
     if(res.status===200 || res.status===201){
      Swal.fire({
        title: 'this course is added to your wish list',
        icon:'success',
        toast:true,
        timer: 5000,
        position: 'top-right',
        timerProgressBar:true,
        showConfirmButton:false
      });
      setfavoriteStatus('success');
     }
     
  });
}catch(error){
  console.log(error);
}
}

const removeFavorite=()=>{
  const studentId=localStorage.getItem('studentId');
  const _formData=new FormData();
  _formData.append('course',course_id);
  _formData.append('student',studentId);
  _formData.append('status',false);
  try{
      axios.get(baseUrl+'/student-remove-favorite-course/'+course_id+'/'+studentId,_formData,{
          headers:{
              'content-type': 'multipart/form-data'
          }
      })
  .then((res)=>{
     if(res.status===200 || res.status===201){
      Swal.fire({
        title: 'this course is removed from your wish list',
        icon:'success',
        toast:true,
        timer: 5000,
        position: 'top-right',
        timerProgressBar:true,
        showConfirmButton:false
      });
      setfavoriteStatus('');
     }
     
  });
}catch(error){
  console.log(error);
}
}

  // console.log(relatedcourseData);

  const[ratingData,setratingData]=useState({
    rating:'',
    reviews:''
  });

  const handleChange=(event)=>{
    setratingData({
      ...ratingData,
      [event.target.name]: event.target.value
    });
  }

  const formSubmit=()=>{ 
    const _formData=new FormData();
   
    _formData.append('course',course_id);
    _formData.append('student',studentId);
    _formData.append('rating',ratingData.rating);
    _formData.append('reviews',ratingData.reviews);
    try{
        axios.post(baseUrl+'/course-rating/'+course_id,_formData)
    .then((res)=>{
        // console.log(res.data);
        if(res.status==200|| res.status==201){
          Swal.fire({
            title:'rating has been added',
            icon: 'success',
            toast:true,
            timer:5000,
            position:'top-right',
            timerProgressBar:true,
            showConfirmButton:false
          })

          window.location.reload();
        }       
    });
}catch(error){
    console.log(error);
}

};

  
    return(
         <div className="container mt-4 ">
            <div className="row">
                <div className="col-4">
                <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/>
                </div>
                <div className='col-8'>
                    <h3>{courseData.title}</h3>
                    <p> {courseData.description}
                    </p>
                    <p>Author : <Link to={`/teacher-detail/${teacherData.id}`}><strong>{teacherData.full_name}</strong></Link></p>
                    <p>Techs :<strong>{techListData.map((tech,index)=>
                      <Link to ={`/category/${ tech.trim()}`} className='badge badge-pill text-dark bg-warning mr-2'>{tech.trim()}</Link> 
                    )}</strong></p>
                    <p><strong>Duration :3 Hours 30 Minutes</strong></p>
                    <p><strong>Total Enrolled: {courseData.total_enrolled_students} Student(s)</strong></p>
                    <p><strong>Rating : {AvgRating}/5
                    <p> <strong> Views :{courseViews}</strong></p>
                    {
                     enrollStatus==='success' && userLoginStatus === 'success' &&
                      <>
                      {ratingStatus!='success' &&
                        <button className='btn btn-success btn-sm ms-2' data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                      }
                      {ratingStatus=='success' &&
                      <small className='ms-5 badge bg-info text-dark'>you already rated this course</small>
                      }

                        <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="ratingModalLabel">Rate for {courseData.title} </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                              <form>
                                <div class="mb-3">
                                  <label for="exampleInputEmail1" class="form-label">Rating</label>
                                  <select onChange={handleChange} className='form-control' name='rating'>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                  </select>
                                </div>
                                <div class="mb-3">
                                  <label for="exampleInputPassword1" class="form-label">Review</label>
                                  <textarea onChange={handleChange} className='form-control' name='reviews'  row="10"></textarea>
                                </div>
                                <button onClick={formSubmit} type="submit" class="btn btn-primary">Submit</button>
                              </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        </>
                    }
                    </strong></p>
                    {
                     enrollStatus==='success' && userLoginStatus == 'success' &&
                        <p><span>You are already inrolled in this course</span></p>
                    }
                    {
                      userLoginStatus==='success' && enrollStatus!== 'success' &&
                        <p><button onClick={enrollCourse} type ="button" className='btn btn-success'> Enroll in this course </button></p>
                    }
                     {
                      userLoginStatus==='success' && favoriteStatus!== 'success' &&
                        <p><button onClick={markAsFavorite} type ="Add i your favorite course list" className='btn btn-outline-danger' ><i className="bi bi-heart-fill"></i></button></p>
                    }
                    {
                      userLoginStatus==='success' && favoriteStatus=== 'success' &&
                        <p><button onClick={removeFavorite} type ="removed from the wish list" className='btn btn-danger' ><i className="bi bi-heart-fill"></i></button></p>
                    }
                   {
                      userLoginStatus!== 'success' &&
                        <p><Link to='/user-login'>Please login to enroll in this course</Link></p>
                    }
                </div>
            </div>
            {enrollStatus=='success' && userLoginStatus=='success' &&
            <div className="cards mt-5">
               <div className="card-header">
                <h5> In this Course</h5> 
               </div>
               <ul className="list-group list-group-flush">
                  {chapterData.map((chapter,index)=>
                 <li className="list-group-item" key={chapter.id}>{chapter.title}
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end" data-bs-toggle="modal" data-bs-target="#videoModal1">
                           <i className="bi-youtube"></i>
                        </button> 
                    </span>
                    {/* video play modal */}
                    <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <div className="ratio ratio-16x9">
                              <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div> 
                 </li>)}
               </ul>
              
            </div>
}
            <h3 className="pb-1 mb-5">Related Courses</h3>
        <div className="row">
        {relatedcourseData.map((rcourse,index)=>
          <div className="col-md-3">
            <div className="card">
            <Link target="__blank" to={'/CourseDetail/'+rcourse.pk} ><img src={siteUrl+'media/'+ rcourse.fields.featured_img} className="card-img-top" alt={rcourse.fields.title}/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link target="__blank" to={'/CourseDetail/'+rcourse.pk} >{rcourse.fields.title}</Link></h5>        
              </div>
            </div>
          </div>
        )}
            </div>
         </div>
    );
}
export default CourseDetail;