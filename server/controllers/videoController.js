import { createBlobAndAploadVideo, deleteBlob } from '../utils/Azure_blob'
import { readFileSync } from 'fs'
export const uploadVideo = async (req, res) => {

    try {
        const response = await createBlobAndAploadVideo(readFileSync(req.files.video.path))
        return res.json({ videoUrl: `https://basicstorage1414.blob.core.windows.net/evideos/${response}.mp4` })
    } catch (error) {
        return res.status(500).json("upload to azure has failed internel error");
    }
}


export const deleteVideo = async (req, res) => {
    /*  course name */
    const { blobName, slug } = req.params;
    console.log(slug)
    try {
        const response = await deleteBlob(blobName, 'evideos');
        return res.status(203).json("delete was successful!")
    } catch (error) {
        console.log(error);
        return res.status(502).json("unexpected error when deleting the video :(")
    }
}