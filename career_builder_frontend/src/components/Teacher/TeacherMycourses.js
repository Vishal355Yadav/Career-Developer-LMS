import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  {useEffect} from 'react';
function TeacherMycourses(){
    useEffect(()=>{
        document.title='My Courses';
    });
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
               <div className='card'>
        <h5 className='card-header'> My Courses</h5>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Enrolled</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <td>Php Development</td>
                    <td><Link to='/'>65</Link></td>
                    <td><button className='btn btn-danger btn-primary active ms-2'>Delete</button></td>
                    <Link className='btn btn-primary active ms-2'to='/add-chapter/2'>Add Chapters</Link>
                </tbody>
            </table>
        </div>

    </div>   
               </section>
            </div>
        </div>
    );
}
export default TeacherMycourses;