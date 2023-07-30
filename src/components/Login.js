import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../index.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    // Inputs the login credentials 
    const handleChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }

    // Validates login details. Endpoint: 'https://memoflow-backend.vercel.app/api/auth/login'. If success -> Stores auth-token to localStorage
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://memoflow-backend.vercel.app/api/auth/login`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("Logged in successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    return (
        <div className='login-page'>
            <div className="intro">
                <div className='h1'>
                    <h1 style={{color: '#673ab7', fontSize: '4.3rem'}}>From Mind,</h1>
                    <h1 className='memo' style={{color: 'black', fontSize: '4.3rem'}}>To Memo</h1>
                </div>
                <p className='text-justify' style={{width: '300px'}}>Elelvate your productivity with MemoFlow. Store your notes and memos on the cloud with security</p>
                <p style={{marginTop: '15px'}}><strong>Create a free account now!</strong></p>
            </div>
            <div className='login'>
                <h1 style={{color: '#673ab7', textAlign: 'center', marginBottom: '20px'}}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
