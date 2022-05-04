import React from "react";
import { useLocation } from 'react-router-dom';
import { getPicturesFromAlbum } from "../../helpers/api";
import { Picture } from "../Picture/Picture";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import  {UploadPicture}  from "../UploadPicture/UploadPicute";
import './Styles.css'
import {  useDispatch } from "react-redux";
import { setAlbumId } from "../../redux/album/action";
import {MenuItem} from "react-pro-sidebar";
import { BsCloudPlus } from "react-icons/bs";

export const PreviewAlbum = () => {
    const { state } = useLocation();
    const { albumInfo } = state
    const [images, setImages] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const setImageAndReload = (value) => {
        setOpen(value)
    }
    
    React.useEffect(()=>{
        //dispatch(setAlbumId(albumInfo.id))
        localStorage.setItem('album',albumInfo.id)
        getPicturesFromAlbum(Number(albumInfo.id))
            .then(res => {
                setImages(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])
    return(
        <div className="previewContainer">
             <Modal 
                show={open}
                backdrop="static"
                keyboard={false}    
            >
                <Modal.Header>Upload Image</Modal.Header>
                <Modal.Body>
                   <UploadPicture setModal={setImageAndReload}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=> setOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>{albumInfo.name}</h1>
            <section id="uploadSection">
                <MenuItem onClick={()=>setOpen(true)} icon={< BsCloudPlus  size={30} />} />  
            </section>
            <section id="divider"/>
            <div>
                {images && images.length > 0 ? 
                    images.map(image => <Picture key={image.id} id={image.id} albumId={albumInfo.id} url={image.url} description={image.description}/>)
                    : <></>
                }
            </div>
        </div>
    )
}