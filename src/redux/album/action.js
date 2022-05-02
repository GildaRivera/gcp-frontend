export const setAlbumId = (albumId) => (dispatch)=>{
    console.log("pictureId",albumId)
    try {
        dispatch({type:'SET_ALBUM_ID',payload:albumId})
    } catch (error) {   
        console.error('An error ocurred',error)
    }
}
export const setAlbumToDefault = () => (dispatch)=>{
    try {
        dispatch({type:'SET_ALBUM_TO_DEFAUL'})
    } catch (error) {   
        console.error('An error ocurred',error)
    }
}