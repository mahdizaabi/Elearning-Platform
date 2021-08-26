import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { Avatar, Button, Tooltip, Modal } from "antd";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";

const CourseView = () => {

    const [fetchedCouse, setFetchedCourse] = useState({});
    const [lessonValues, setLessonValues] = useState({
        title: "",
        content: "",
        video: "",
    });
    const [uploading, setUploading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [videoTitel, setVideoTitel] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const router = useRouter();

    /*  course name */
    const { slug } = router.query;

    /*  form submission    */
    const handleAddLesson = (e) => {
        e.preventDefault();
        console.log("handlecreatelesson")
        console.log(lessonValues)
        setUploading(true);

    }

    const handelVideo = async (e) => {
        try {
            let videoFile = e.target.files[0];
            setVideoTitel(videoFile.name);
            setUploading(true);

            const videoData = new FormData();
            videoData.append('video', videoFile);
            const videoResponseData = await axios.post("/api/course/video/upload", videoData, {
                onUploadProgress: (e) => {
                    setUploadProgress(Math.round(100 * e.loaded) / e.total)
                }
            })

            console.log("video ressponse data: ", videoResponseData)
            setUploading(false);
            setLessonValues({ ...lessonValues, video: videoResponseData.data });
        } catch (error) {
            console.log(error.message)
            setUploading(false);
            toast("Video uploading has failed")
        }

    }


    /*
    Delete video from Azure !
    */
    const handleVideoRemove = async () => {
        const blobName = lessonValues.video.videoUrl.split("/evideos/")[1].split(".mp4")[0];
        try {
            setUploading(true);
            const deleteVideoResponse = await axios.get(`/api/course/video/remove/${blobName}`);
            setLessonValues({ ...lessonValues, video: { videoUrl: "" } });
            setUploading(false);
        } catch (error) {
            console.log(error)
            setUploading(false)
            toast("video removing failed :( ");
        }
    }

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(`/api/course/${slug}`);
            setFetchedCourse(response.data);
        }
        fetchCourse();
    }, [slug])
    return (
        <InstructorRoute>
            <div className="container-fluid pt-3">
                {/*<pre>{JSON.stringify(fetchedCouse, null, 4)}</pre>*/}
                {fetchedCouse &&
                    <>
                        <div className="media d-flex pt-2">
                            <Avatar
                                size={80}
                                src={fetchedCouse.image ? fetchedCouse.image.imageUrl : "./course.png"}
                            ></Avatar>
                            <div className="body-container w-50">
                                <div className="media-body">
                                    <div className="row">
                                        <div className="">
                                            <h5
                                                style={{ "marginTop": "-10px", "marginLeft": "10px" }}
                                                className="mt-2 ml-5 text-primary">{fetchedCouse.name}</h5>
                                            <p
                                                style={{ "marginTop": "-10px", "marginLeft": "10px" }}
                                            >{fetchedCouse.lessons && fetchedCouse.lessons.length}  lesson</p>
                                            <p
                                                style={{ "marginTop": "-10px", "marginLeft": "10px" }}
                                            >{fetchedCouse.lessons && fetchedCouse.category} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="course-control d-flex">
                                <div className="control-left" style={{ paddingTop: "6px" }}>
                                    <Tooltip
                                        title="Edit"
                                        className="ml-4"
                                    >
                                        <EditOutlined className="h5 pointer text-warning "></EditOutlined>
                                    </Tooltip>
                                </div>
                                <div className="control-right" style={{ marginLeft: "19px", paddingTop: "6px" }}>
                                    <Tooltip
                                        title="Publish"
                                    >
                                        <CheckOutlined className="h5 pointer text-danger ml-4"></CheckOutlined>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        {/*  Course description */}
                        <div className="description-box pl-5">
                            <p style={{ marginLeft: "12px" }}>
                                <b
                                    style={{}}>Description: </b>
                                {fetchedCouse.description}</p>
                        </div>
                        <div className="row">
                            <Button
                                onClick={() => setVisible(true)}
                                className="col-md-2 offset-md-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                            >
                                Add lesson
                            </Button>

                            <Modal
                                title="+ Add Lesson"
                                centered
                                visible={visible}
                                onCancel={() => setVisible(false)}
                                footer={null}
                            >
                                <AddLessonForm
                                    setLessonValues={setLessonValues}
                                    lessonValues={lessonValues}
                                    setUploading={setUploading}
                                    uploading={uploading}
                                    handleAddLesson={handleAddLesson}
                                    visible={visible}
                                    handelVideo={handelVideo}
                                    setVideoTitel={setVideoTitel}
                                    videoTitel={videoTitel}
                                    uploadProgress={uploadProgress}
                                    handleVideoRemove={handleVideoRemove}
                                ></AddLessonForm>
                            </Modal>
                        </div>
                    </>
                }
            </div>
        </InstructorRoute>
    )
}
export default CourseView;