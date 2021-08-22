import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreationFrom from '../../../components/forms/courseCreationForm'
import { useState } from 'react'
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import axios from 'axios';

const CourseCreate = () => {

    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("");
    const [image, setImage] = useState("");
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
        let file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setCourse({ ...course, loading: true })
        Resizer.imageFileResizer(file, 700, 500, "JPEG", 100, 0, async (imageUri) => {
            try {
                setCourse({ ...course, loading: true })
                let { data } = await axios.post('/api/course/upload-image', {
                    image: imageUri
                })
                console.log(data)
                setCourse({ ...course, loading: false })
                setImage(data.imageUri)
                
            } catch (error) {
                console.log(error)
                setCourse({ ...course, loading: false })
                toast("Image upload failed, try later")
            }
        })

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
                uploadButtonText={uploadButtonText}
            ></CourseCreationFrom>
          {image &&  <img src={`https://basicstorage1414.blob.core.windows.net/epimages/${image}`} alt="dd"/>} 
        </InstructorRoute>
    </>)

}

export default CourseCreate;