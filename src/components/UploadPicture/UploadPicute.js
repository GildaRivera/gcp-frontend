import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import "./Styles.css"
import { attachPictureToAlbum, uploadPicture } from "../../helpers/api";


const UploadPicture = (props) => {
    const [fileToUpload, setFile] = React.useState({
        file:[],
        filepreview:null,
    });
    const [description,setDescription] =React.useState()
    const [image, setImage] = React.useState() 
    
    const handleInputChange = (event) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
        setFile({
          ...fileToUpload,
          file:event.target.files[0],
          filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }
    const onSubmit = async () => {
        props.setModal(false)
        const formData = new FormData()
        formData.append('file',fileToUpload.file)
        formData.append('user_id',4)
        formData.append('description',description)

        if(props.album && props.album.albumId){
            const uploadedImage = await uploadPicture(formData)
            console.log("uploadImage",uploadedImage)
            if(uploadPicture === 'error') return console.error(uploadPicture)
            const albumToImage = new FormData()
            albumToImage.append('album',props.album.albumId)
            albumToImage.append('image',uploadedImage.data.id)
            const addImageToAlbum = await attachPictureToAlbum(albumToImage)
            console.log("Attach Album",addImageToAlbum) 
        }else{
            const uploadedImage = await uploadPicture(formData)
        }
    }
    return(
        <div className="mainPictureContainer">
            {image && <img width={100} height={100} src={URL.createObjectURL(image)}/>}
            <input type='file' onChange={handleInputChange}/>
            <p>Descripción</p>
            <input id="description" type='text' onChange={event => setDescription(event.target.value) } />
            <button onClick={onSubmit}> Upload image </button>
        </div>
    )
}

const mapStateToPros = state => {
    return state
}

export default connect(mapStateToPros,null)(UploadPicture) 
