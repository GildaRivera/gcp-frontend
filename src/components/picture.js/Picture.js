import React from "react";
import axios from "axios";
import { FilePond } from "react-filepond";
import "./Styles.css"


export const Picture = () => {
    const [file, setFile] = React.useState()

    

    const onSubmit = () => {
        const formData = new FormData()
        formData.append('fileUpload',file,file.name)
      /*   fetch('http://localhost:3001/api/picture',{
            method: 'POST',
            headers:{
                'Content-type': 'undefined'
            },
            body:formData
        }) */
        axios.post('http://localhost:3001/api/picture',formData)
        console.log(formData)
    }
    return(
        <div className="mainPictureContainer">
            <input type='file' onChange={(event)=>{
                console.log(event.target.files[0])
                setFile(event.target.files[0])
            }}/>
            <button onClick={onSubmit}> Presioname </button>
        </div>
    )
}