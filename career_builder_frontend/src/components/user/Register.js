import  {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl ='http://127.0.0.1:8000/api/teacher/';
function Register(){
    useEffect(()=>{
        document.title='User Register';
    });
    const [studentData,setstudentData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status':''
    });

    const handleChange=(event)=>{ 
        setstudentData({
            ...studentData, //spread operator
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("full_name",studentData.full_name)
        studentFormData.append("email",studentData.email)
        studentFormData.append("password",studentData.password)
        studentFormData.append("username",studentData.username)
        studentFormData.append("interested_categories",studentData.interested_categories)
    
        try{
            axios.post(baseUrl,studentFormData).then((response)=>{
                setstudentData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'username':'',
                    'interested_categories': '',
                    'status': 'success'
                });
            });
        }catch(error){
            console.log(error);
            setstudentData({'status':'error'});
        }
    
    };
    return(
        <div className="container mt-4 ">
        <div className="row">
            <div className="col-6 offset-3">
                {studentData.status==='success' && <p className="text-success">Thanks for you registration</p>}
                {studentData.status==='error' && <p className="text-danger">Something wrong happened!!</p>}
                <div className="card">
                    <h5 className="card-header">User Register</h5>
                    <div className="card-body">
                    {/* <form> */}
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Full Name</label>
                            <input onChange={handleChange} type="text" name="full_name" value={studentData.full_name} className="form-control" id="exampleInputname" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input onChange={handleChange} type="email" name='email' value={studentData.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Username</label>
                            <input onChange={handleChange} type="text" name="username" value={studentData.username} className="form-control" id="exampleInputname" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={handleChange} type="password" name='password' value={studentData.password} className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Interests</label>
                            <input onChange={handleChange} type="text" name="interested_categories" value={studentData.interested_categories} className="form-control" id="exampleInputname" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text">Php, Python, Java, etc.</div>
                        </div>
                        <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                        {/* </form> */}
                    </div>

                </div>
           </div>
            </div>
        </div>
    );

}
export default Register;