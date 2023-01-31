// import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  {useEffect} from 'react';
function TeacherAddCourse(){
    useEffect(()=>{
        document.title='Add Courses';
    });
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
                    <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
                 <div className='card'>
                    <h5 className='card-header'>Add Course</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Tittle</label>
                        <div className="col-sm-10">
                           <input type="text" className="form-control" id="title"/>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label for="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <textarea className="form-control" id="description"></textarea>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label for="Course_video" className="col-sm-2 col-form-label">Course Image</label>
                        <div className="col-sm-10">
                           <input type="file" className="form-control" id="course_video"/>
                        </div>
                       </div>
                       <div className="mb-3 row">
                        <label for="technology" className="col-sm-2 col-form-label">Technologies</label>
                        <div className="col-sm-10">
                        <textarea className="form-control" placeholder='Php,Python,Js,HTML,CSS' id="technology"></textarea>
                        </div>
                       </div>
                    
                       <hr></hr>
                         <button className='btn btn-primary'>update</button>
                         </form>
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default TeacherAddCourse;