// import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useParams} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherProfileSetting(){
   const [teacherData,setteacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills': '',
        'profile_img':'',
        'f_img':'',
        'status': ''
    });
   const teacherId=localStorage.getItem('teacherId');
    useEffect(()=>{
      
        try{
            axios.get(baseUrl+'/teacher/'+teacherId)
            .then((res)=>{ 
                setteacherData({
                    full_name: res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.skills,
                    profile_img:res.data.profile_img,
                    f_img:'',
                });
            });
        }catch(error){ 
            console.log(error);
        } 

    },[]);
    const handleChange=(event)=>{ 
        setteacherData({
            ...teacherData, //spread operator
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append("full_name",teacherData.full_name)
        teacherFormData.append("email",teacherData.email)
        teacherFormData.append("qualification",teacherData.qualification)
        teacherFormData.append("mobile_no",teacherData.mobile_no)
        teacherFormData.append("skills",teacherData.skills)
        if(teacherData.f_img!=='' ){
          teacherFormData.append('profile_img',teacherData.f_img,teacherData.f_img.name);
        }
        try{
            axios.put(baseUrl+'/teacher/'+teacherId+'/',teacherFormData,{headers:{
                'content-type': 'multipart/form-data'
            }
            }).then((response)=>{
                if(response.status==200){
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
            setteacherData({'status':'error'});
        }
    
    };

   useEffect(()=>{
        document.title='Teacher Profile';
    });
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!=true){
        window.location.href='/teacher-login';
    }
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
                    <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
                 <div className='card'>
                    <h5 className='card-header'>Profile Setting</h5>
                    <div className='card-body'>
                      <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                           <input type="text" name="full_name" value={teacherData.full_name} onChange={handleChange} className="form-control" id="staticEmail"/>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                           <input type="email" value={teacherData.email} onChange={handleChange} className="form-control" id="staticEmail"/>
                        </div>
                       </div>
                        <div className="mb-3 row">
                        <label for="video" className="col-sm-2 col-form-label">Profile Image</label>
                        <div className="col-sm-10">
                           <input type="file"  onChange={handleFileChange}  name='f_img' id="video" className="form-control" />
                           {teacherData.profile_img &&
                           <p className="mt-2"><img src ={teacherData.profile_img} width="300" /></p>
                           }
                        </div>
                       </div>
                       <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Skills</label>
                        <div className="col-sm-10">
                          <textarea  onChange={handleChange} name="skills" value={teacherData.skills}  className="form-control"></textarea>
                            <div id="emailHelp" className="form-text"> Php, python,javascipt etc</div>
                        </div>
                       </div>
                       <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Qualification</label>
                        <div className="col-sm-10">
                           <textarea  onChange={handleChange} name="qualification" value={teacherData.qualification}  className="form-control"></textarea>
                            <div id="emailHelp" className="form-text">bca|mca</div>
                        </div>
                       </div>
                       <hr></hr>
                         <button className='btn btn-primary' onClick={submitForm}>update</button>
                     
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default TeacherProfileSetting;