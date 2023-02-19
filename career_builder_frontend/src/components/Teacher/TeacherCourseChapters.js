import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function CourseChapters(){ 
    const [chapterData,setChapterData]=useState([]);
    const {course_id}=useParams();
    // console.log(teacherId);
    useEffect(()=>{
        document.title='All Courses';
        try{
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res)=>{ 
                setChapterData(res.data);
            });
        }catch(error){ 
            console.log(error);
        } 
    },[]);
    console.log(chapterData);
    return(
        <div className="container mt-4 ">
        <div className="row">
           <aside className="col-md-3">
           <TeacherSidebar/>
           </aside>
           <section className='col-md-9'>
           <div className='card'>
    <h5 className='card-header'> All Chapters</h5>
    <div className='card-body'>
    <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Video</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {chapterData.map((chapter,index)=>
                    <tr>
                    <td><Link to="">{chapter.title}</Link></td>
                    
                    <td>
                        <video controls width="150">
                            <source src={chapter.video.url}
                            type="video/webm"></source>
                            <source src={chapter.video.url}
                            type="video/mp4"></source>
                        </video>
                    </td>
                    <td>{chapter.remarks}</td>

                    <td><button className='btn btn-danger btn-sm'>Delete</button>
                    <button className='btn btn-info btn-sm ms-1'>Edit</button>
                    </td>
                    
                  </tr>
                    )} 
                </tbody>
            </table>
    </div>

</div>   
           </section>
        </div>
    </div>
    );
}
export default CourseChapters;