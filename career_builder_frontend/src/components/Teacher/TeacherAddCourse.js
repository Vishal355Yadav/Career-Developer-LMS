import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function TeacherAddCourse(){
    const [cats,setCats]=useState([]);
    const[courseData,setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        f_img:'',
        techs:''
    });


    useEffect(()=>{
        document.title='Add Courses';
        try{
            axios.get(baseUrl+'/category')
            .then((res)=>{ 
                setCats(res.data);
            });
        }catch(error){
            console.log(error);
        } 
    },[]);
    
    const handleChange=(event)=>{
           setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
    });
}   
    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }
const formSubmit=()=>{ 
    const _formData=new FormData();
    _formData.append('category',courseData.category);
    _formData.append('teacher',1);
    _formData.append('title',courseData.title);
    _formData.append('description',courseData.description);
    _formData.append('featured_img',courseData.f_img,courseData.f_img.name);
    _formData.append('techs',courseData.techs);
    try{
        axios.post(baseUrl+'/course/',_formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
    .then((res)=>{
        // console.log(res.data);
        window.location.href='/add-course';
       
    });
}catch(error){
    console.log(error);
}

};
//    console.log(cats);
//    console.log(courseData);
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
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name='category' onChange={handleChange} className='form-control'>
                            {cats.map((category,index)=>{return <option key={index} value={category.id} >{category.title}</option>})}
                        </select>
                        <label htmlFor="title" className="col-sm-2 col-form-label">Tittle</label>
                        <div className="col-sm-10">
                           <input type="text" onChange={handleChange}  name='title' id="title" className="form-control"/>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <textarea  onChange={handleChange} name='description' id="description"  className="form-control"></textarea>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label htmlFor="Course_video" className="col-sm-2 col-form-label">Course Image</label>
                        <div className="col-sm-10">
                           <input type="file"  onChange={handleFileChange}  name='f_img' id="course_video" className="form-control" />
                        </div>
                       </div>
                       <div className="mb-3 row">
                        <label htmlFor="techs" className="col-sm-2 col-form-label">Technologies</label>
                        <div className="col-sm-10">
                        <textarea  onChange={handleChange} placeholder='Php,Python,Js,HTML,CSS' name='techs' id="techs" className="form-control"></textarea>
                        </div>
                       </div>
                    
                       <hr></hr>
                         <button  onClick={formSubmit} className='btn btn-primary'>update</button>
                         </form>
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default TeacherAddCourse;

