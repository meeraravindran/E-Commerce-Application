import React, {useState} from 'react';
import Base from "../core/Base";
import {Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/helper";

const Signin = () =>{

    const [values, setValues] = useState({
        email: "",
        password: "" ,
        error:"",
        loading:"",
        didRedirect: ""
    });
    
    const {email, password, error, loading, didRedirect} = values;

    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error : false, [name]:event.target.value });
    };


    const loadingMessage = () => {
        return loading &&(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success">Loading...</div>
                </div>
            </div>
        )};

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-warning" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )};

    const performRedirect = () =>{

    //TODO: redirection not complete
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    }


    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values, error: false,loading : true});
        signin({email, password})
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            } else{
                authenticate(data, ()=>{
                    setValues({...values,didRedirect:true,})
                })
            }
        }).catch(()=>console.log("Sign in failed"));
    }

    const SigninForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="password"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Sign in</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign in page">
            {errorMessage()}
            {loadingMessage()}
            {SigninForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;