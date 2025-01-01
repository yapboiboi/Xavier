import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
   const [values, setValues] = useState({
    email:'',
    password:''
   })

   const navigate = useNavigate()
   
   function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/login', values)
        .then(res => {
            navigate('/home')
            console.log(res.data);
        })
        .catch(err => console.log(err))

   }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-white"> 
      <div className='p3 bg-white w-25 '>
        <form onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
                <label>Email</label>
                <input 
                    className='form-control' 
                    type='email' 
                    required 
                    onChange={(e) => {setValues({...values, email: e.target.value})}}/>
            </div>
            <div className='form-group mb-3'>
                <label>Password</label>
                <input 
                    className='form-control' 
                    type='password' 
                    required
                    onChange={(e) => {setValues({...values, password: e.target.value})}} />
            </div>
            <div>
                <button className='btn btn-success' type='submit'>Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
