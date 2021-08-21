import axios from 'axios';
import { useState } from 'react';
import InstructorRoute from '../../../components/routes/InstructorRoute'

const CourseCreate = () => {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        categorie: '',
        price:'',
        uploading: '',
        paid: true,
        loading: false,
        imagePreview: ''
    })
    return (<>
        <InstructorRoute>
            <h1 className="jumbotron text-center square p-4"> Create Course</h1>
        </InstructorRoute>
    </>)

}

export default CourseCreate;