import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    let navigate=useNavigate();
   
    const [creds, setcreds] = useState({name:"",email:"",password:"",location:""})

    const handleSubmit= async(e)=>{ 

        e.preventDefault();
        const response= await fetch("https://mealmate-ws3d.onrender.com/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:creds.name,email:creds.email,password:creds.password , location:creds.location})
        })
        const json = await response.json();
        console.log(json)
        if(!json.success){
            alert("enter valid credentials")
        }
        else{
            navigate("/login");
        }
    }
    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value})
    }
   
    return (

        <>
            <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className='form-label'>NAME</label>
                    <input type="text" className="form-control" name='name' value={creds.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className='form-label'>Email address</label>
                    <input type="email" className="form-control" name='email' value={creds.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' value={creds.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1">address</label>
                    <input type="text" className="form-control" name='location' value={creds.location} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>already a user</Link>
            </form>
            </div>

        </>
    )
}
