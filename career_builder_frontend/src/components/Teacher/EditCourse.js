import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function EditCourse(){
    const [cats,setCats]=useState([]);
    const[courseData,setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        prev_img:'',
        f_img:'',
        techs:''
    });

    const {course_id}=useParams();
    useEffect(()=>{
        document.title='Edit Course';
        try{
            axios.get(baseUrl+'/category')
            .then((res)=>{ 
                setCats(res.data);
            });
        }catch(error){
            console.log(error);
        }
        
        try{
            axios.get(baseUrl+'/teacher-course-detail/'+course_id)
            .then((res)=>{ 
                setCourseData({
                    category:res.data.category,
                    title: res.data.title,
                    description:res.data.description,
                    prev_img:res.data.featured_img,
                    f_img:'',
                    techs:res.data.techs,
                });
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
    _formData.append('teacher',course_id);
    _formData.append('title',courseData.title);
    _formData.append('description',courseData.description);
    if(courseData.f_img!=='' ){
    _formData.append('featured_img',courseData.f_img,courseData.f_img.name);
    }
    _formData.append('techs',courseData.techs);
    try{
        axios.put(baseUrl +'/teacher-course-detail/'+ course_id,_formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
    .then((res)=>{ 
        // console.log(res.data);
        // window.location.href='/add-course';
        if(res.status==200){
            Swal.fire({
                title: 'Data has been updated',
                icon:'success',
                toast:true,
                timer:3000,
                position:'top-right',
                timerProgressBar:true,
                showConfirmButton:false
            });
             
        }
       
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
                    <h5 className='card-header'>Edit Course</h5>
                    <div className='card-body'>
                    <form>
                    <div className="mb-3 row">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name='category' value={courseData.category} onChange={handleChange} className='form-control'>
                            {cats.map((category,index)=>{return <option key={index} value={category.id} >{category.title}</option>})}
                        </select>
                        <label htmlFor="title" className="col-sm-2 col-form-label">Tittle</label>
                        <div className="col-sm-10">
                           <input type="text" value={courseData.title} onChange={handleChange}  name='title' id="title" className="form-control"/>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <textarea  onChange={handleChange} value={courseData.description} name='description' id="description"  className="form-control"></textarea>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label htmlFor="Course_video" className="col-sm-2 col-form-label">Featured Image</label>
                        <div className="col-sm-10">
                           <input type="file"  onChange={handleFileChange}  name='f_img' id="course_video" className="form-control" />
                           {courseData.prev_img &&
                           <img src ={courseData.prev_img} width="300" alt={courseData.title}/>
                           }
                        </div>
                       </div>
                       <div className="mb-3 row">
                        <label htmlFor="techs" className="col-sm-2 col-form-label">Technologies</label>
                        <div className="col-sm-10">
                        <textarea  onChange={handleChange} value={courseData.techs} placeholder='Php,Python,Js,HTML,CSS' name='techs' id="techs" className="form-control"></textarea>
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
export default EditCourse;

