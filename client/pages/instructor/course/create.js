import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreationFrom from '../../../components/forms/courseCreationForm'
import { useState } from 'react'
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import axios from 'axios';
import deleteBlob from '../../../utils/Azure_delete_blob'
import { useRouter } from 'next/router';
const CourseCreate = () => {
    const router = useRouter();

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
    })

    const handleChange = e => {
        setCourse({ ...course, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {

        let file = e.target.files[0]
        if (preview) {
            URL.revokeObjectURL(file);
        }
        let imagePreview = window.URL.createObjectURL(file);
        // console.log(previewImageName);
        //setPreview(previewImageName);
        //setUploadButtonText(file.name);
        setCourse({ ...course, loading: true })
        Resizer.imageFileResizer(file, 700, 500, "JPEG", 100, 0, async (Base64ResizedImage) => {
            try {
                setCourse({ ...course, loading: true })
                let { data } = await axios.post('/api/course/upload-image', {
                    image: Base64ResizedImage
                })
                setCourse({ ...course, loading: false });
                setPreview(imagePreview);
                let imageName = file.name;

                if (imageName.length >= 10) {
                    imageName = imageName.slice(0, 10) + "..."
                }
                setUploadButtonText(imageName);
                setImage(data.imageUri);
            } catch (error) {
                console.log(error)
                setCourse({ ...course, loading: false })
                toast("Image upload failed, try later")
            }
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/course", {
            course: {
                ...course, image: {
                    imageUrl: `https://basicstorage1414.blob.core.windows.net/epimages/${image}`,
                    blobName: image
                }
            }
        })

        router.push('/');
        console.log(response)
    }

    const handleImageRemove = async () => {
        if (course.loading) {
            return;
        }
        try {
            const { data } = await axios.post("/api/image/image-preview/delete", {
                blobName: image
            })
            setPreview("");
            setImage("");
        } catch (error) {
            console.log(error);

            toast("Ipage uplaoed has failed try later on!")
        }

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
                handleImageRemove={handleImageRemove}
            ></CourseCreationFrom>
            {image && <img src={`https://basicstorage1414.blob.core.windows.net/epimages/${image}`} alt="dd" />}
        </InstructorRoute>
    </>)

}

export default CourseCreate;