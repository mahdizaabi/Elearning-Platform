import axios from 'axios';
import { useEffect, useState } from 'react';
import InstructorRoute from '../../components/routes/InstructorRoute'
import Avatar from "antd/lib/avatar/avatar";
import Link from 'next/link';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const InstructorIndex = () => {
    const [courses, setCourses] = useState();
    useEffect(() => {
        loadCourses();
    }, [])

const myStyle = {marginTop: "-15px", fontSize: "10px"}
    const loadCourses = async () => {
        const { data } = await axios.get("/api/instructor/courses");
        setCourses(data);
    }
    return (<>
        <InstructorRoute>
            <h1 className="jumbotron text-center square p-4"> Instructorc Dashboard</h1>
            {/*<pre> {JSON.stringify(courses, null, 4)} </pre>*/}

            <div className="row instructor_courses">
                <div className="col">
                    {courses && courses.map(course => (
                        <div className="media d-flex align-items-center flex-row pb-3 pt-2">
                            <div className="align-self-start">
                                <Avatar
                                    src={course.image ? course.image.imageUrl : '/course.png'}
                                    size={80}
                                ></Avatar>
                            </div>

                            <div className="media-body pl-5">
                                <siv className="row w-100">
                                    <div className="col pl-5">
                                        <Link
                                            href={`/instructor/course/view/${course.slug}`}
                                            className="pointer"
                                        >
                                            <a className="h5 text-primary">
                                                
                                                <h5>{course.name}</h5>
                                                </a>
                                        </Link>

                                        <p style={{}}>
                                            {course.lessons.length} Lessons
                                        </p>

                                        {course.lessons.length < 5 ? (
                                            <p style={myStyle}>At least 5 lessosn are required to publish a course</p>
                                        ) : course.published ? <p style={myStyle}>"your course is published"</p> : 
                                        <p stye={myStyle}>   you course is ready to be published</p>
                                     }

                                    </div>


                                    <div className="col-md-3 mt-3 text-center">
                                        {course.published ? (
                                            <div>
                                                <CheckCircleOutlined className="h5 pointer text-success"/>
                                            </div>) :

                                            (<div>
                                                <CloseCircleOutlined className="pointer h5 text-warning"></CloseCircleOutlined>
                                            </div>)}
                                    </div>
                                </siv>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </InstructorRoute>
    </>)

}

export default InstructorIndex;