import {Link} from 'react-router-dom';
function Header() {
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Carrier Builder LMS</Link>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form class="form-inline my-2 my-lg-0 d-inline-flex ">
            <input class="form-control mr-sm-2" type="search" placeholder="Search by course title" aria-label="Search" />
            <button class=" btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/all-courses">Course</Link>
              {/* <a className="nav-link" href="#">Teacher</a> */}
              <li className="nav-item dropdown">
                 <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Teacher 
                 </Link>
                <ul className="dropdown-menu">
                  {teacherLoginStatus!='true' &&
                  <>
                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                  </>
                  }   
                  {teacherLoginStatus=='true' &&
                  <>          
                  <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                  </>}
                </ul>
              </li>
              <li className="nav-item dropdown">
                 <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    User
                 </Link>
                <ul className="dropdown-menu">
                  {studentLoginStatus!='true' &&
                  <>
                  <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                  </>}
                  {studentLoginStatus==='true' && <>    
                  <li><Link className="dropdown-item" to="/student-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                  </>}
                </ul>
              </li>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  export default Header;