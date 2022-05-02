import React from "react";
import { useLocation } from 'react-router-dom';
import { getPicturesFromAlbum } from "../../helpers/api";
import { Picture } from "../Picture/Picture";
import './Styles.css'

export const PreviewAlbum = () => {
    const { state } = useLocation();
    const { albumInfo } = state
    const [images, setImages] = React.useState([])
    
    React.useEffect(()=>{
        getPicturesFromAlbum(Number(albumInfo.id))
            .then(res => {
                setImages(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])
    console.log(albumInfo)
    return(
        <div className="previewContainer">
            <h1>{albumInfo.name}</h1>
            <div>
                {images && images.length > 0 ? 
                    images.map(image => <Picture key={image.id} url={image.url} description={image.description}/>)
                    : <></>
                }
            </div>
        </div>
    )
}