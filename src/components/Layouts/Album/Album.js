import React from "react";
import {MenuItem} from "react-pro-sidebar";
import { BsCloudPlus } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './Styles.css'
import { createAlbum, deleteAlbum, getAlbums } from "../../../helpers/api";
import  {UploadPicture}  from "../../UploadPicture/UploadPicute";
import { useNavigate } from 'react-router-dom';
import { setAlbumId } from "../../../redux/album/action";
import { connect, useSelector, useDispatch } from 'react-redux';
import trash from './trash.jpeg' 


export const Album = () => {
    const { user } = useSelector((state) => state.user);
    //const { album } = useSelector((state) => state.album);
    const [open, setOpen] = React.useState(false)
    const [pictureModal, setPictureModal] = React.useState(false)
    const [render, setRender] = React.useState('')
    const [albums, setAlbums] = React.useState([])
    const [nameAlbum, setNameAlbumn] = React.useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const uploadAlbum = async () => {
        try {
            const album = await createAlbum(nameAlbum,user.id)
            dispatch(setAlbumId(album.data.id))
            localStorage.setItem('album',album.data.id)
            setOpen(false)
            setPictureModal(true)
            console.log(album)
        } catch (error) {
            console.log(error)
        }
    }

    const mandatoryFirstPicture = (value) => {
        setPictureModal(value)
        setRender('render')
    }

    const removeAlbum = async (id) => {
        try {
            console.log("Removing Album,",id)
            await deleteAlbum(id)
        } catch (error) {
            console.log(error)
        }
    }
    
    const viewSelectedAlbum = (album) => {
        navigate('previewAlbum',{ state: {albumInfo: album}})
    }

    React.useEffect(()=>{
        getAlbums(user.id)
            .then(response => {
                console.log(response.data)
                setAlbums(response.data)
            }).catch(err => {
                console.error(err)
            })
    },[])
 
    return(
        <div className="albumContainer">
            <Modal 
                show={open}
                backdrop="static"
                keyboard={false}    
            >
                <Modal.Header>Create new album</Modal.Header>
                <Modal.Body>
                    <p>Name of the album</p>
                    <input style={{width:'450px'}} type="text" onChange={event => setNameAlbumn(event.target.value)}/>
                    <button style={{marginTop:'10px', borderRadius:'30px', width:'450px'}} onClick={uploadAlbum}> Create Album </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=> setOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                show={pictureModal}
                backdrop="static"
                keyboard={false}    
            >
                <Modal.Header>Upload first picture</Modal.Header>
                <Modal.Body>
                   <UploadPicture setModal={mandatoryFirstPicture} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=> setPictureModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Albums</h1>
            <section id="uploadSection">
                <MenuItem onClick={()=>setOpen(true)} icon={< BsCloudPlus  size={30} />} />  
            </section>
            <section id="divider"/>
            <div>
                {albums && albums.length > 0 ? 
                    albums.map(album => <section key={album.id}>
                        <MenuItem onClick={() => viewSelectedAlbum(album)} icon={< BiPhotoAlbum  size={60} />} />  
                        <img onClick={()=>removeAlbum(album.id)} src={trash} width={30} height={30}/>
                        <p id="albumName">{album.name}</p>
                       
                    </section>):<h2> Create your first Album! </h2>
                }  
            </div>
        </div>
    )
}
