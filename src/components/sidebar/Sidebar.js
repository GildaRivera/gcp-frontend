//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaUserCircle } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import {Route, Routes , useLocation, useNavigate} from 'react-router-dom'



//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Styles.css";

import { Home } from "../Layouts/Home/Home";
import { Album } from "../Layouts/Album/Album";
import { Profile } from "../Layouts/Profile/Profile";


const Sidebar = () => {
  
    //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  const navigate = useNavigate()

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleAlbum = () => {
    navigate('album')
  }
  const handleHome = () => {
    navigate('/home')
  }
  const handleProfile = () => {
    navigate('profile')
  }

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Pic" : "My Pictures"}</p>
          </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}  onClick={handleHome}>
                Home
              </MenuItem>
              <MenuItem icon={<FaUserCircle />} onClick={handleProfile}>Profile</MenuItem>
              <MenuItem icon={<AiFillPicture />} onClick={handleAlbum}>Albums</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      <div id="rightContainer">
        <Routes>
          <Route  path='/' element={< Home />}></Route>
          <Route exact path="profile" element={<Profile/>}></Route>
          <Route exact path="album" element={<Album/>}></Route>
        </Routes>  
      </div>
    </>
  );
};

export default Sidebar;