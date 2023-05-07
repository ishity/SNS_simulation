import React from 'react'


export default function Online({user}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
            <span className="rightbarOnline"></span>
            <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="rightbarProfileImg" />  
            
        </div>  
        <span className="rightbarUsername">{user.username}</span>
    </li> 
  )
}
