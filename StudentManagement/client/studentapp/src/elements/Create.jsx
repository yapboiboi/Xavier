import {React, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  })
  
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    console.log(values)

    axios.post('http://localhost:5000/add_user', values)
    .then(res => {
        navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="container vh-100 vw-100 bg-white" >
      <div className='row justify-content-center'>
        <h3 className='text-center text-black'>Add Student</h3>
        <div className='d-flex justify-content-end'>
            <Link to='/' className='btn btn-success'>Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-black'>Name</label>
                <input type='text' className='form-control' required 
                onChange={(e) => setValues({...values, name: e.target.value})}/>
            </div>
            <div className='form-group'>
                <label className='text-black'>Email</label>
                <input type='email' className='form-control' required onChange={(e) => setValues({...values, email: e.target.value})}/>
            </div>
            <div className='form-group'>
                <label className='text-black'>Age</label>
                <input type='number' className='form-control' required onChange={(e) => setValues({...values, age: e.target.value})}/>
            </div>
            <div className='form-group'>
                <label className='text-black'>Gender</label>
                <input type='text' className='form-control' required onChange={(e) => setValues({...values, gender: e.target.value})}/>
            </div> 
            <div className='form-group mt-3'>
                <button type='submit' className='btn btn-success'>Add</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Create
