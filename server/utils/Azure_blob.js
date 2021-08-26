const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');
require('dotenv').config()


const account = process.env.ACCOUNT_NAME || "";
const SAS = process.env.SAS || "";


const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${SAS}`

);

export async function createBlobAndAploadFile(datax) {
    const blobName = 'img_' + uuidv1() + '.JPG';

    try {
        const containerName = "epimages"
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        console.log('\nUploading to Azure storage as blob:\n\t', blobName);
        blockBlobClient.requestContentType = 'image/jpeg'
        const data = datax;
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        console.log("response body from Azure ===>", uploadBlobResponse)
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
        return blobName;
    } catch (error) { 
        console.log(error) }
        throw(error)
}

export async function deleteBlob(blobName, containerName) {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const response = await containerClient.deleteBlob(blobName)
        console.log('\ndeleting blob:\n\t', blobName);
        console.log("response body from Azure ===>", response)
        console.log("Blob was deletes successfully. requestId: ", response.requestId);
        return response;
    } catch (error) { 
        console.log(error)
        throw error;
    }

}


export async function createBlobAndAploadVideo(datax) {
    const blobName = 'vid_' + uuidv1();
    try {
        const containerName = "evideos"
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        console.log('\nUploading to Azure storage as blob:\n\t', blobName);
        const data = datax;
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

        console.log("response body from Azure ===>", uploadBlobResponse)
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
        return blobName;
    } catch (error) { 
        console.log(error) }
        throw(error)
}