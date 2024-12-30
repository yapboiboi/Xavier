import {React,useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function Read() {
  const [students, setStudents] = useState([])
  const {id} = useParams() 

  useEffect(() => {
    axios.get(`/get_students/${id}`)
        .then(res => {
            setStudents(res.data)
        })
        .catch(err => console.log(err))
    }, [id])
  return (
    <div className='container-fluid bg-white vh-100 vw-100'>
    <h3>Student Details</h3>
       <Link to='/' className='btn btn-success justify-content-end'>Home</Link>
       {students.map((student) => {
              return (
                <ul className='list-group mt-4' key={student.id}>  
                    <li className='list-group-item'>Name: {student.name}</li>
                    <li className='list-group-item'>Email: {student.email}</li>
                    <li className='list-group-item'>Age: {student.age}</li>
                    <li className='list-group-item'>Gender: {student.gender}</li>
                </ul>
              )
       })}
    </div>
  )
}

export default Read
