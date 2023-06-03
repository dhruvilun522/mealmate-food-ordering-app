import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let navigate=useNavigate();
    const [creds, setcreds] = useState({email:"",password:""})

    const handleSubmit= async(e)=>{ 

        e.preventDefault();
        const response= await fetch("https://mealmate-ws3d.onrender.com/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:creds.email,password:creds.password})
        })
        const json = await response.json();
        console.log(json)
        if(!json.success){
            alert("enter valid credentials")
        }
        else{
            localStorage.setItem("authToken",json.authToken)
          navigate("/");
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
            <label for="exampleInputEmail1" className='form-label'>Email address</label>
            <input type="email" className="form-control" name='email' value={creds.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={creds.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>new user</Link>
    </form>
    </div>

</>
  )
}
