import {deleteBlob} from '../utils/Azure_blob';

export const imagePreviewDelete = async(req, res) => {
    
    const {blobName} = req.body;
    if(!blobName)
    return res.status(400).json("image not found");

    try {
        const response = await deleteBlob(blobName, "epimages");
        return res.json("success")}
        catch(error){
            return res.status(400).json("delete image has failed!")
        } 

}