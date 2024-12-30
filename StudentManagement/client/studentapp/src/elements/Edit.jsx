import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Edit() {
    const [student, setStudent] = useState(null);  // Keep track of a single student
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the student data when the component mounts
        axios.get(`/get_students/${id}`)
            .then(res => {
                setStudent(res.data[0]);  // Assuming data is an array and we need the first element
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        // Log the student data to check what is being sent
        console.log("Sending data to the backend:", student);

        // Make the API call to edit the student
        axios.post(`http://localhost:5000/edit_student/${id}`, student)
            .then(res => {
                console.log(res);
                navigate('/');  // Navigate back to home after successful submission
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        // Update only the specific field that changed, without affecting others
        setStudent({
            ...student,
            [e.target.name]: e.target.value,  // Dynamically update the field
        });
    };

    return (
        <div className='container-fluid bg-white vh-100 vw-100'>
            <h3>Student Details</h3>
            <Link to='/' className='btn btn-success justify-content-end'>Back</Link>

            {student && (
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='text-black'>Name</label>
                        <input
                            type='text'
                            name="name"
                            className='form-control'
                            required
                            value={student.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='text-black'>Email</label>
                        <input
                            type='email'
                            name="email"
                            className='form-control'
                            required
                            value={student.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='text-black'>Age</label>
                        <input
                            type='number'
                            name="age"
                            className='form-control'
                            required
                            value={student.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='text-black'>Gender</label>
                        <input
                            type='text'
                            name="gender"
                            className='form-control'
                            required
                            value={student.gender}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <button type='submit' className='btn btn-success'>Edit</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Edit;
