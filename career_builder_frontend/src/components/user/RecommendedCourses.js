import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import  {useEffect} from 'react';
function RecommendedCourses(){
    useEffect(()=>{
        document.title='Recommended Course';
    });
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <Sidebar/>
               </aside>
               <section className='col-md-9'>
               <div className='card'>
        <h5 className='card-header'>Recommended Courses</h5>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <td>Php Development</td>
                    <td><Link to='/'>Love Babbar</Link></td>
                    <td><button className='btn btn-primary active'>Unenroll</button></td>
                </tbody>
            </table>
        </div>

    </div>   
               </section>
            </div>
        </div>
    );
}
export default RecommendedCourses;