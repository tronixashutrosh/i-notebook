import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

function Signup(props) {
    const [note, setNote] = useState();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let history= useHistory();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const {name, email, password}= credentials;

        // API call
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json= await response.json()
        if(json.success){
            localStorage.setItem('token', json.authToken)
            history.push("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid credentials", "danger")
        }
    }
    const onChange= (e)=>{
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container">
            <h2 className="my-2">Create New Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="password" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
