import  {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl ='http://127.0.0.1:8000/api/teacher/';
function TeacherRegister(){
    const [teacherData,setteacherData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'skills': '',
        'status': ''
    });
    const handleChange=(event)=>{ 
        setteacherData({
            ...teacherData, //spread operator
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append("full_name",teacherData.full_name)
        teacherFormData.append("email",teacherData.email)
        teacherFormData.append("password",teacherData.password)
        teacherFormData.append("qualification",teacherData.qualification)
        teacherFormData.append("mobile_no",teacherData.mobile_no)
        teacherFormData.append("skills",teacherData.skills)
    
        try{
            axios.post(baseUrl,teacherFormData).then((response)=>{
                setteacherData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'qualification':'',
                    'mobile_no':'',
                    'skills': '',
                    'status': 'success'
                });
            });
        }catch(error){
            console.log(error);
            setteacherData({'status':'error'});
        }
    
    };
    useEffect(()=>{
        document.title='Teacher Register';
    });


    return(
        <div className="container mt-4 ">
        <div className="row">
            <div className="col-6 offset-3">
                {teacherData.status==='success' && <p className="text-success">Thanks for you registration</p>}
                {teacherData.status==='error' && <p className="text-danger">Something wrong happened!!</p>}
                <div className="card">
                    <h5 className="card-header">Teacher Register</h5>
                    <div className="card-body">
                    {/* <form> */}
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Full Name</label>
                            <input onChange={handleChange} type="text" name="full_name" value={teacherData.full_name} className="form-control" id="exampleInputname" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input onChange={handleChange} type="email" name="email"  value={teacherData.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={handleChange} type="password" name="password" value={teacherData.password}  className="form-control" id="exampleInputPassword1"/>
                        </div>
                        {/* <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label"> Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div> */}
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Qualifications</label>
                            <input onChange={handleChange}  type="text" name="qualification"  value={teacherData.qualification} className="form-control" id="exampleInputqualification" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Mobile No.</label>
                            <input  onChange={handleChange} type="number" name="mobile_no"  value={teacherData.mobile_no}  className="form-control" id="exampleInputmobile" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputSkill" className="form-label">Skills</label>
                           <textarea  onChange={handleChange} name="skills" value={teacherData.skills}  className="form-control"></textarea>
                            <div id="nameHelp" className="form-text"> Php, python,javascipt etc</div>
                        </div>
                        { <button  onClick={submitForm} type="submit" className="btn btn-primary">Register</button> }
                        {/* </form> */}
                    </div>

                </div>
           </div>
            </div>
        </div>
    );
}
export default TeacherRegister;