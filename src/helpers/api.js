import axios from "axios"

const URL = process.env.REACT_APP_ENDPOINT_API;

export const uploadPicture = async (formData) => {
    try {
       const response = await axios.post(`${URL}/uploadImage`,formData)
       return response.data
    } catch (error) {
        console.error(error)
        return 'error'
    }
} 

export const getAllPicture = async (userId) => {
    try {
        const pictures = await axios.get(`${URL}/picture`,{ params: { userId: userId } })
        return pictures.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const createAlbum = async (album,userId) => {

    try {
        const response = await axios.post(`${URL}/album`,{name:album,userId:userId})
        return response.data
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

export const attachPictureToAlbum = async (formData) => {
    console.log("attachPictureToAlbum",formData)
    try {
        const response = await axios.post(`${URL}/addImageToAlbum`,formData)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

export const getAlbums = async (userId) => {
    try {
        const response = await axios.get(`${URL}/album`,{params: {userId: userId}})
        return response.data
    } catch (error) {
        return 'error'
    }
}

export const getPicturesFromAlbum = async (albumId) => {
    try {
        const response = await axios.get(`${URL}/getImagesFromAlbum`,{params: {albumId: albumId}})
        return response.data
    } catch (error) {
        console.log(error.message)
        return 'error'
    }
}

export const deletePicture = async (pictureId) => {
    try {
        const response = await axios.delete(`${URL}/picture`,{ data: { picture: pictureId } })
        return response.data
    } catch (error) {
        console.log(error.message)
        return 'error'
    }
}

export const deletePictureFromAlbum = async (albumId,pictureId) => {
    try {
        const response = await axios.delete(`${URL}/pictureFromAlbum`,{data:
            {
                album: albumId,
                image: pictureId
            }})
        return response.data
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

export const deleteAlbum = async (albumId) => {
    try {
        const response = await axios.delete(`${URL}/album`,{ data: { id: albumId } })
        return response.data
    } catch (error) {
        try{
            const response = await axios.delete(`${URL}/emptyAlbum`,{ data: { id: albumId } })
        }catch(err){
            console.log(err)
        }
        return 'error'
    }
}