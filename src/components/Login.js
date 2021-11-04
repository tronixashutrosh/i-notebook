import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [note, setNote] = useState();
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history= useHistory();

    const handleSubmit= async (e)=>{
        e.preventDefault();

        // API call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json= await response.json()
        if(json.success){
            localStorage.setItem('token', json.authToken)
            history.push("/");
            props.showAlert("Loggedin", "success")
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
        <div className="container mt-2">
            <h2 className="my-2">Login to your Account</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
