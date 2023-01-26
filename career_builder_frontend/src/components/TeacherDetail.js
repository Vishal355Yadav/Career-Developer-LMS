import {Link} from 'react-router-dom';
import  {useEffect} from 'react';
function TeacherDetail(){
    useEffect(()=>{
        document.title='Teacher Detail';
    });
    return (
        <div className="container mt-4 ">
        <div className="row">
            <div className="col-4">
            <img src="/logo512.png" className="img-thumbnail" alt="Teacher Image"/>
            </div>
            <div className='col-8'>
                <h3>Love Babar</h3>
                <p> Wait...it's not over though! The whole purpose of the algorithm is to customize the runtime correctly. Imagine if the
                    range increases from 1-15 to 1-100. The compiler will check each number to determine whether it is divisible by 3
                    or 5. It would then run through the numbers again to check if the numbers are divisible by 3 and 5. The code would
                    essentially have to run through each number in the array twice — it would have to runs the numbers by 3 first and
                    then run it by 5.
                </p>
                <p><strong>Skills : </strong><Link to="/category/php"><strong>PHP,</strong></Link> <Link to="/category/php"><strong>Python,</strong></Link><Link to="/category/php"><strong>JavaScipt</strong></Link></p>
                <p><strong>Recents: <Link to="/category/php"><strong>React JS Course</strong></Link></strong></p>
                <p><strong>Rating : 4.5/5</strong></p>
            </div>
        </div>
        <div className="cards mt-5">
           <div className="card-header">
            <h5>Course List</h5>      
           </div>
           <div className="list-group list-group-flush">
             <Link to ='/CourseDetail/1'  className='list-group-item list-group-item-action'>Python Course 1</Link>
             <Link to ='/CourseDetail/1'  className='list-group-item list-group-item-action'>C++ Course 1</Link>
             <Link to ='/CourseDetail/1'  className='list-group-item list-group-item-action'>DataStructure Course 1</Link>
             <Link to ='/CourseDetail/1'  className='list-group-item list-group-item-action'>Competative Programming Course </Link>
             <Link to ='/CourseDetail/1'  className='list-group-item list-group-item-action'>JavaScript Course </Link>
             <Link to ='/CourseDetail/1'  className='list-group-item list-group-item-action'>STL Course </Link>
            </div>
          
        </div>
     </div>
    );
}
export default TeacherDetail;
