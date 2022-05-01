import axios from "axios"

const URL = 'http://localhost:3001/api'

export const getAllPicture = async (userId) => {
    try {
        const pictures = await axios.get(`${URL}/picture`,{ params: { userId: userId } })
        return pictures.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const createAlbum = async (album) => {
    try {
        const response = await axios.post(`${URL}/album`,{name:album})
        return response.data
    } catch (error) {
        console.log(error)
        return 'error'
    }
}