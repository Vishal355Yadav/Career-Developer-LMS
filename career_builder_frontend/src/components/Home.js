import {Link} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import AllCourses from './AllCourses';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function Home() {
const [courseData,setCourseData]=useState([]);
const teacherId=localStorage.getItem('teacherId');
// console.log(teacherId);
useEffect(()=>{
  document.title='LMS | Home';
    try{
        axios.get(baseUrl+'/course/?result=4 ')
        .then((res)=>{ 
            setCourseData(res.data);
        });
    }catch(error){ 
        console.log(error);
    } 
},[]);
    return (
      <div className="container mt-4">
        <h3 className="pb-1 mb-4">Latest Courses <h5><Link to="/all-courses" className="float-end">See all</Link></h5></h3>
        <div className="row">
            {courseData && courseData.map((course,index)=>
          <div className="col-md-3 mb-4">
            <div className="card">
            <Link to={'/CourseDetail/'+course.id} ><img src={course.featured_img} className="card-img-top" alt={course.title}/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={'/CourseDetail/'+course.id} >{course.title}</ Link></h5>        
              </div>
            </div>
          </div>
          )}
        </div>
        {/* some related courses */}
        <h3 className="pb-1 mb-4 mt-5">Popular Courses <h5><Link to="/popular-courses" className="float-end">See all</Link></h5></h3>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
            <Link to="/CourseDetail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/CourseDetail/1" >Course Title</ Link></h5> 
                <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>
                      <span className='float-end'> Views : 20343</span>
                </div>

              </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
            <Link to="/CourseDetail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/CourseDetail/1" >Course Title</ Link></h5>        
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>
                      <span className='float-end'> Views : 20343</span>
                </div>

              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
             <Link to="/CourseDetail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/CourseDetail/1" >Course Title</ Link></h5>        
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>
                      <span className='float-end'> Views : 20343</span>
                </div>

              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
            <Link to="/CourseDetail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/CourseDetail/1" >Course Title</ Link></h5>        
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>
                      <span className='float-end'> Views : 20343</span>
                </div>

              </div>
            </div>
          </div>
        </div>
         
        <h3 className="pb-1 mb-4 mt-5">Popular Teachers <h5><Link to="/popular-teachers" className="float-end">See all</Link></h5></h3>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
            <Link to="/teacher-detail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1" >Teacher Name</ Link></h5>       
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>                    
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
            <Link to="/teacher-detail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1" >Teacher Name</ Link></h5>        
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>                    
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
            <Link to="/teacher-detail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1" >Teacher Name</ Link></h5>        
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>                    
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
            <Link to="/teacher-detail/1" ><img src="logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/teacher-detail/1" >Teacher Name</ Link></h5>        
              </div>
              <div className='card-footer'>
                <div className='tittle'>
                      <span>Rating: 4.5/5</span>                    
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="pb-1 mb-4 mt-5">Student Testonomials</h3>
        <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="true">
         <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
             <div className="carousel-item active">
              <figure class="text-center">
                <blockquote class="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
              <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
             </div>
          <div className="carousel-item">
             <figure class="text-center">
            <blockquote class="blockquote">
               <p>A well-known quote, contained in a blockquote element.</p>
                 </blockquote>
              <figcaption class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
           </figure>
            </div>
          <div className="carousel-item">
          <figure class="text-center">
                <blockquote class="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
              <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
      </div>
     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
         <span className="visually-hidden">Previous</span>
      </button>
       <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
         <span className="visually-hidden">Next</span>
  </button>
</div>

      </div>
    );
  } 

  export default Home;