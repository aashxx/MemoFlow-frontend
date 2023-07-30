import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
    let navigate = useNavigate();

    // Inputs the signup credentials
    const handleChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }

    // Validates signup details. Endpoint: 'https://memoflow-backend.vercel.app/api/auth/createuser'. If success -> Stored details to db and generates auth-token to localStorage to login.
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://memoflow-backend.vercel.app/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("Created account successfully", "success");
        } else {
            props.showAlert("Invalid Details", "danger");
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
                <h1 style={{color: '#673ab7', textAlign: 'center', marginBottom: '20px'}}>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" value={credentials.name} id="name" name='name' aria-describedby="emailHelp" onChange={handleChange} required minLength={3}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={handleChange} required minLength={5}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} required minLength={5}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
