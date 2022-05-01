import React from "react";
import './Styles.css'

export const Picture = ({url, description}) => {
    return(
        <div className="picContainer">
            <img src={url} alt={description} width={150} height={100}/>
            <p>{description}</p>
        </div>
    )
}