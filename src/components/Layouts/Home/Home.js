import React from "react";
import { getAllPicture } from "../../../helpers/api";
import { Picture } from "../../Picture/Picture";
import './Styles.css'
import { BsCloudPlus } from "react-icons/bs";
import {MenuItem} from "react-pro-sidebar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import  UploadPicture  from "../../UploadPicture/UploadPicute";


export const Home = () => {
    const [images, setImages] = React.useState([])
    const [open, setOpen] = React.useState(false)
    
    React.useEffect(()=>{
        getAllPicture(4)
            .then(res => {
                console.log(res.data)
                setImages(res.data)
            })
            .catch(err => {
                console.log(err)
            }) 
    },[])
    const setImageAndReload = (value) => {
        setOpen(value)
    }
    return (
        <div className="homeContainer" id="homeContainer">
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
            <h2>Welcome Back Fernando</h2>
            <section id="uploadSection">
                <MenuItem onClick={()=>setOpen(true)} icon={<BsCloudPlus  size={30}/>} />  
            </section>
            <section id="divider"/>
            <div>
                {images && images.length > 0 ?
                    images.map((image,index) => <Picture key={index} url={image.url} description={image.description}/> )
                    : <h1 id="alarmFirstImage"> Add your first image! </h1>
                }
            </div>    
        </div>
    )
}