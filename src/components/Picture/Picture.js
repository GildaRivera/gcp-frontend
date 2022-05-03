import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import {MenuItem} from "react-pro-sidebar";
import { deletePicture, deletePictureFromAlbum } from "../../helpers/api";
import './Styles.css'

export const Picture = ({url, description, id, albumId}) => {
    const handleDelete = async () => {
        try {
            if(albumId){
                await deletePictureFromAlbum(albumId, id)
                console.log("Picture has been removed from Album ",albumId)
            }else{
                await deletePicture(id)
                console.log("Picture has been removed")
            }
        } catch (error) {
            console.error(error)
        }
       
    } 
    return(
        <div className="picContainer">
            <MenuItem  active={true} icon={<BsFillTrashFill />}  onClick={handleDelete}>
               Delete
              </MenuItem>
            <img src={url} alt={description} width={150} height={100}/>
            <p>{description}</p>
        </div>
    )
}