import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Timeline from '../../components/timeline/TimeLine';
import Rightbar from '../../components/rightbar/Rightbar';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const username = useParams().username;
    console.log(username);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?username=${username}`); 
            console.log(response);
            setUser(response.data);
        };
        fetchUser();
    },[]);

    return (
        <>
        <Topbar />
        <div className="profile">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img 
                        src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"}
                        alt="" 
                        className='profileCoverImg'/>
                        <img 
                        src={currentUser.profilePicture
                            ? PUBLIC_FOLDER + currentUser.profilePicture 
                            : PUBLIC_FOLDER + "/person/noAvatar.png"} 
                        alt="" 
                        className='profileUserImg'/>
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{ user.username }</h4>
                        <span className='profileInfoDesc'>{ user.desc }</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Timeline username={username} />
                    <Rightbar user={user} />
                </div>
                
            </div>
        </div>
    </>
  )
}
