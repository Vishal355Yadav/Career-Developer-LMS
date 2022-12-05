function Register(){
    return(
        <div className="container mt-4 ">
        <div className="row">
            <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">User Register</h5>
                    <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputFullname" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="exampleInputname" aria-describedby="nameHelp"/>
                            <div id="nameHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label"> Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>

                </div>
           </div>
            </div>
        </div>
    );

}
export default Register;