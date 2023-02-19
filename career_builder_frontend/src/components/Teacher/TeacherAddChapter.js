// import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function TeacherAddChapter(){

    const[chapterData,setChapterData]=useState({
        title:'',
        description:'', 
        video:'',
        remarks:''
    });
  

    useEffect(()=>{
        document.title='Add Chapter'; 
    },[]);
    
    const handleChange=(event)=>{
           setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
    });
}   
    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }
const {course_id}=useParams();
const formSubmit=()=>{ 
    const _formData=new FormData();
   
    _formData.append('course',course_id);
    _formData.append('title',chapterData.title);
    _formData.append('description',chapterData.description);
    _formData.append('video',chapterData.video,chapterData.video.name);
    _formData.append('remarks',chapterData.remarks);
    try{
        axios.post(baseUrl+'/chapter/',_formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
    .then((res)=>{
        // console.log(res.data);
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
                    <h5 className='card-header'>Add Chapter</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label for="title" className="col-sm-2 col-form-label">Tittle</label>
                        <input type="text" onChange={handleChange}  name='title' className="form-control"  id="title"/>
                    </div>
                        <div className="mb-3 row">
                        <label for="description" className="col-sm-2 col-form-label" >Description</label>
                        <div className="col-sm-10">
                        <textarea onChange={handleChange} name='description' className="form-control"  id="description"></textarea>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label for="Course_video" className="col-sm-2 col-form-label">Video</label>
                        <div className="col-sm-10">
                           <input type="file" onChange={handleFileChange}  name='video' className="form-control" id="course_video"/>
                        </div>
                       </div>
                       <div className="mb-3 row">
                        <label for="technology" className="col-sm-2 col-form-label">Remarks</label>
                        <div className="col-sm-10">
                        <textarea onChange={handleChange}  name='remarks' className="form-control" placeholder='This video is focused on ..' id="technology"></textarea>
                        </div>
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
export default TeacherAddChapter;