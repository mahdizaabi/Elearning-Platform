import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreationFrom from '../../../components/forms/courseCreationForm'
import { useState } from 'react'

const CourseCreate = () => {

    const [preview, setPreview] = useState("");
    const [course, setCourse] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        uploading: '',
        paid: true,
        loading: false,
        imagePreview: ''
    })

    const handleChange = e => {
        setCourse({ ...course, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        console.log(window.URL.createObjectURL(e.target.files[0]));
        setPreview(window.URL.createObjectURL(e.target.files[0]));

    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (<>
        <InstructorRoute>
            <h1 className="jumbotron text-center square p-5"> Create Course</h1>
            <CourseCreationFrom
                handleChange={handleChange}
                handleImage={handleImage}
                handleSubmit={handleSubmit}
                course={course}
                setCourse={setCourse}
                preview={preview}
                setPreview={setPreview}
            ></CourseCreationFrom>
        </InstructorRoute>
    </>)

}

export default CourseCreate;