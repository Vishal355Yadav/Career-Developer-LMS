// import {Link} from 'react-router-dom';
// import Mycourses from './Mycourses';
import TeacherSidebar from './TeacherSidebar';
// import {Routes as Switch, Route} from 'react-router-dom';
function TeacherDashboard(){
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
                Dashboard
               </section>
            </div>
        </div>
    );

}
export default TeacherDashboard ;  