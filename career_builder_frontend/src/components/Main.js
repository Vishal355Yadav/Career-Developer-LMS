import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Login from './user/Login';
import Dashboard from './user/Dashboard';
import Register from './user/Register';
import AllCourses from './AllCourses';
import Logout from './user/StudentLogout';
import StudentAssignments from './user/StudentAssignments';
// teacher 
import TeacherDetail from './TeacherDetail'
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherLogout from './Teacher/TeacherLogout';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherAddCourse from './Teacher/TeacherAddCourse';
import EditCourse from './Teacher/EditCourse';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherMycourses from './Teacher/TeacherMycourses';
import EnrolledStudents from './Teacher/EnrolledStudents';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import MyUsers from './Teacher/MyUsers';
import AllChapters from './Teacher/TeacherCourseChapters';
import EditChapter from './Teacher/EditChapter';
import FavoriteCourses from './user/FavoriteCourses';
import RecommendedCourses from './user/RecommendedCourses';
import ProfileSetting from './user/ProfileSetting';
import ChangePassword from './user/ChangePassword';
import Mycourses from './user/Mycourses';
import CourseDetail  from './Coursedetail';
import {Routes, Route} from 'react-router-dom';
// import Mycourses from './user/Mycourses';
import PopularCourses from './PopularCourses';
import PopularTeacher from './PopularTeacher';
import CategoryCourses from './CetegoryCourses';
import TeacherSkillCourses from './TeacherSkillCourses';
import TeacherAddChapter from './Teacher/TeacherAddChapter';
import AddAssignment from './Teacher/AddAssignment';
import ShowAssignment from './Teacher/ShowAssignment';

function Main() {
    return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/CourseDetail/:course_id' element={<CourseDetail/>}/>
          <Route path='/user-login' element ={<Login/>}/>          
          <Route path='/logout' element ={<Logout/>}/>
          <Route path='/user-register' element ={<Register/>}/>
          <Route path='/student-dashboard' element ={<Dashboard/>}/>
          <Route path='/my-courses' element ={<Mycourses/>}/>
          <Route path='/favorite-courses' element ={<FavoriteCourses/>}/>
          <Route path='/recommended-courses' element ={<RecommendedCourses/>}/>
          <Route path='/profile-setting' element ={<ProfileSetting/>}/>
          <Route path='/change-password' element ={<ChangePassword/>}/>
          
          <Route path='/teacher-login' element ={<TeacherLogin/>}/>
          <Route path='/teacher-logout' element ={<TeacherLogout/>}/>
          <Route path='/teacher-register' element ={<TeacherRegister/>}/>
          <Route path='/teacher-dashboard' element ={<TeacherDashboard/>}/>
          <Route path='/add-course' element ={<TeacherAddCourse/>}/>
          <Route path='/edit-course/:course_id' element ={<EditCourse/>}/>
          <Route path='/add-chapter/:course_id' element ={<TeacherAddChapter/>}/>
          <Route path='/add-assignment/:teacher_id/:student_id' element ={<AddAssignment/>}/>
          <Route path='/show-assignment/:teacher_id/:student_id' element ={<ShowAssignment/>}/>
          <Route path='/my-assignment/' element ={<StudentAssignments/>}/>
          <Route path='/teacher-courses' element ={<TeacherMycourses/>}/>
          <Route path='/enrolled-students/:course_id' element ={<EnrolledStudents/>}/>
          <Route path='/teacher-change-password' element ={<TeacherChangePassword/>}/>
          <Route path='/teacher-profile-setting' element ={<TeacherProfileSetting/>}/>
          <Route path='/my-users' element ={<MyUsers/>}/>
          <Route path='/teacher-detail/:teacher_id' element ={<TeacherDetail/>}/>
          
          <Route path='/all-courses' element ={<AllCourses/>}/>
          <Route path='/all-chapters/:course_id' element ={<AllChapters/>}/>
          <Route path='/edit-chapter/:chapter_id' element ={<EditChapter/>}/>
          <Route path='/popular-courses' element={<PopularCourses/>}/> 
          <Route path='/popular-teachers' element={<PopularTeacher/>}/> 
          <Route path='/category/:category_slug' element={<CategoryCourses/>}/>
          <Route path='/teacher-skill-courses/:skill_name/:teacher-id' element={<TeacherSkillCourses/>}/>
        </Routes>
        <Footer/>
      </div> 
    );
  }
  
  export default Main;  