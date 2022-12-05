import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Login from './user/Login';
import Dashboard from './user/Dashboard';
import Register from './user/Register';
import TeacherDetail from './TeacherDetail'
// teacher 
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherAddCourse from './Teacher/TeacherAddCourse';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherMycourses from './Teacher/TeacherMycourses';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import MyUsers from './Teacher/MyUsers';

import FavoriteCourses from './user/FavoriteCourses';
import RecommendedCourses from './user/RecommendedCourses';
import ProfileSetting from './user/ProfileSetting';
import ChangePassword from './user/ChangePassword';
import Mycourses from './user/Mycourses';
import CourseDetail  from './Coursedetail';
import {Routes, Route} from 'react-router-dom';
// import Mycourses from './user/Mycourses';

function Main() {
    return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/CourseDetail/:course_id' element={<CourseDetail/>}/>
          <Route path='/user-login' element ={<Login/>}/>
          <Route path='/user-register' element ={<Register/>}/>
          <Route path='/user-dashboard' element ={<Dashboard/>}/>
          <Route path='/my-courses' element ={<Mycourses/>}/>
          <Route path='/favorite-courses' element ={<FavoriteCourses/>}/>
          <Route path='/recommended-courses' element ={<RecommendedCourses/>}/>
          <Route path='/profile-setting' element ={<ProfileSetting/>}/>
          <Route path='/change-password' element ={<ChangePassword/>}/>
          
          <Route path='/teacher-login' element ={<TeacherLogin/>}/>
          <Route path='/teacher-register' element ={<TeacherRegister/>}/>
          <Route path='/teacher-dashboard' element ={<TeacherDashboard/>}/>
          <Route path='/add-course' element ={<TeacherAddCourse/>}/>
          <Route path='/teacher-courses' element ={<TeacherMycourses/>}/>
          <Route path='/teacher-change-password' element ={<TeacherChangePassword/>}/>
          <Route path='/teacher-profile-setting' element ={<TeacherProfileSetting/>}/>
          <Route path='/my-users' element ={<MyUsers/>}/>
          <Route path='/teacher-detail/:teacher_id' element ={<TeacherDetail/>}/>
          
</Routes>
        <Footer/>
      </div> 
    );
  }
  
  export default Main;

  