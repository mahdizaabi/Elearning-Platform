import createBlobAndAploadFile from "../utils/Azure_blob";

export const uploadImage = async (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).json("image not found")
    }
    try {
        const base64Decoded = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64")
        const uploaded_image_url = await createBlobAndAploadFile(base64Decoded);
        return res.status(200).json({imageUri: uploaded_image_url});
    } catch (error) {

        console.log(error)
        return res.status(400).json(error);
    }

}