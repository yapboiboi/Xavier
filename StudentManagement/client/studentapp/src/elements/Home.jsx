import {React, use, useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'bootstrap'

function Home() {
  const [students, setStudents] = useState([])
  useEffect(() => {
    axios.get('/students')
        .then(res => {
            setStudents(res.data)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='container-fluid bg-white vh-100 vw-100'>  
        <h3>Students Management</h3>
        <div className="d-flex justify-content-end">
            <Link to='/create' className='btn btn-success'>Add Student</Link>
        </div>
        <table className='table table-bordered mt-1'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                        <td className='d-flex justify-content-around'>
                            <Link to={`/read/${student.id}`} className='btn btn-success'>Read</Link>
                            <Link to={`/edit/${student.id}`} className='btn btn-success'>Edit</Link>
                            <button className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home
