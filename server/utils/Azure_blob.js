const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');
require('dotenv').config()


const account = process.env.ACCOUNT_NAME || "";
const SAS = process.env.SAS || "";


const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${SAS}`
);

async function createBlobAndAploadFile(datax) {
    const blobName = 'img_' + uuidv1() + '.JPG';

    try {
        const containerName = "epimages"
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        console.log('\nUploading to Azure storage as blob:\n\t', blobName);
        blockBlobClient.requestContentType = 'image/jpeg'
        const data = datax;
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
        return blobName;
    } catch (error) { console.log(error) }

}

export default createBlobAndAploadFile;