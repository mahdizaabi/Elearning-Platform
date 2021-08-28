
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseCreationFrom from "../../../../components/forms/courseCreationForm";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreate from '../create';
import { Avatar, Button, Tooltip, Modal, List } from "antd";
import Item from "antd/lib/list/Item";
import { DeleteOutlined } from "@ant-design/icons";
const Edit = () => {

    const router = useRouter()
    const { slug } = router.query;
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(`/api/course/${slug}`);
            if (response.data) {
                setLessons(response.data.lessons)
            }

        }
        fetchCourse();
    }, [slug])

    console.log("rendeeeeeeeeeeer")

    const handleDrag = (e, index) => {
        e.dataTransfer.setData('itemIndex', index);
    }

    const handleDrop = (e, index) => {
        const itemIndex = e.dataTransfer.getData("itemIndex");
        const targetItemIndex = index;
        let lessonsClone = [...lessons]

        let temp = lessonsClone[targetItemIndex]
        lessonsClone[targetItemIndex] = lessonsClone[itemIndex],
            lessonsClone[itemIndex] = temp;
        setLessons(lessonsClone);
    }
    const handleDelete = async (index, item) => {
        const popup = window.prompt("Are you sure you want to delte")
        if (!popup) return;

        const filtredLessons = lessons.filter((item, indexx) => index !== indexx)
        setLessons(filtredLessons);
        let lessonId= item._id;
        const response = await axios.delete(`/api/course/lesson/delete/${slug}/${lessonId}`);

    }

    return (
        <div className="container edit_page">
            <CourseCreate
                submitUrl={`/api/course/edit/${slug}`}
            />
            <div className="row d-flex justify-content-center">
                <div className="col-8 p-3">
                    <hr />
                    <div className="lesson-list">
                        <h4>{lessons?.length} lessons</h4>
                    </div>
                    <hr />
                    <List
                        onDragOver={(e) => e.preventDefault()}
                        itemLayout="horizental"
                        dataSource={lessons}
                        renderItem={(item, index) =>
                        (<Item
                            draggable
                            onDragStart={event => handleDrag(event, index)}
                            onDrop={event => handleDrop(event, index)}
                        >
                            <Item.Meta
                                avatar={<Avatar>{index + 1}</Avatar>}
                                title={item.title}
                            >
                            </Item.Meta>
                            <DeleteOutlined
                                className="text-danger float-right"
                                onClick={() => handleDelete(index, item)}
                            ></DeleteOutlined>
                        </Item>)
                        }
                    ></List>
                </div>

            </div>
        </div>

    )
}
export default Edit;
