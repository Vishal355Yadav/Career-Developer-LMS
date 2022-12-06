import {Link} from 'react-router-dom';
import  {useEffect} from 'react';
import {useParams} from 'react-router-dom';  //to get id of the course which help to fetch form database
function CourseDetail(){
  useEffect(()=>{
    document.title='Course Detail';
});
    let {course_id}=useParams();
    return(
         <div className="container mt-4 ">
            <div className="row">
                <div className="col-4">
                <img src="/logo512.png" className="img-thumbnail" alt="Course Image"/>
                </div>
                <div className='col-8'>
                    <h3>Course Tittle</h3>
                    <p> Wait...it's not over though! The whole purpose of the algorithm is to customize the runtime correctly. Imagine if the
                        range increases from 1-15 to 1-100. The compiler will check each number to determine whether it is divisible by 3
                        or 5. It would then run through the numbers again to check if the numbers are divisible by 3 and 5. The code would
                        essentially have to run through each number in the array twice — it would have to runs the numbers by 3 first and
                        then run it by 5.
                    </p>
                    <p>Author : <Link to="/teacher-detail/1"><strong>Love Babbar</strong></Link></p>
                    <p><strong>Duration :3 Hours 30 Minutes</strong></p>
                    <p><strong>Total Enrolled: 355 Students</strong></p>
                    <p><strong>Rating : 4.5/5</strong></p>
                </div>
            </div>
            <div className="cards mt-5">
               <div className="card-header">
                <h5>Course Videos</h5>
               </div>
               <ul className="list-group list-group-flush">
                 <li className="list-group-item">Introduction 
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end" data-bs-toggle="modal" data-bs-target="#videoModal1">
                           <i className="bi bi-play"></i>
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
                            <div class="ratio ratio-16x9">
                              <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div> 
                 </li>

                 {/* video play above */}
                 <li className="list-group-item">Introduction 
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end">
                           <i className="bi bi-play"></i>
                        </button> 
                    </span> 
                 </li>
                 <li className="list-group-item">Introduction 
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end">
                           <i className="bi bi-play"></i>
                        </button> 
                    </span> 
                 </li>
                 <li className="list-group-item">Introduction 
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end">
                           <i className="bi bi-play"></i>
                        </button> 
                    </span> 
                 </li>
                 <li className="list-group-item">Introduction 
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end">
                           <i className="bi bi-play"></i>
                        </button> 
                    </span> 
                 </li>
                 
                 
                 
                 </ul>
              
            </div>
            <h3 className="pb-1 mb-5">Related Courses</h3>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
            <Link to="/CourseDetail/1" ><img src="/logo512.png" className="card-img-top" alt="..."/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to="/CourseDetail/1" >Course Title</ Link></h5>        
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
             <a href="#" ><img src="/logo512.png" className="card-img-top" alt="..."/></a>
              <div className="card-body">
                <h5 className="card-title"><a href="#" >Course Title</a></h5>        
              </div>
            </div>
          </div>
            </div>
         </div>
    );
}
export default CourseDetail;