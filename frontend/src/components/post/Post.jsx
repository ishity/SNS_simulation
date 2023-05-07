import { ContentCutOutlined, MoreVert } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
// import {Users} from '../../dummyData';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false); // 推されているかの状態
    const [user, setUser] = useState({}); // 投稿したユーザーの情報

    const {user: currentUser} = useContext(AuthContext);

    // レンダリング時に1回呼び出される
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?userId=${post.userId}`); 
            console.log("情報はこちら" + response);
            setUser(response.data);
        };
        fetchUser();
    },[post.userId]);

    const handleLike = async() => {
        try{
            // いいねのAPIをたたく
            await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id});
        }catch(err){
            console.log(err);
        }

        setLike(isLiked ? like -1 : like +1); //true or false
        setIsLiked(!isLiked); // 更新する
    };

    return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img 
                        src={
                            user.profilePicture 
                            ? PUBLIC_FOLDER + user.profilePicture
                            : PUBLIC_FOLDER + "/person/noAvatar.png"} 
                        alt="" 
                        className="postProfileImg" 
                    />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                <MoreVert />
                </div>
            </div>
            
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
            </div>
            <idv className="postBottom">
                <div className="postBottomLeft">
                    <img 
                        src={PUBLIC_FOLDER + "/heart.png" }
                        alt="" className="likeIcon" 
                        onClick={() => handleLike()}
                    />
                    <span className="postLikeCounter">
                        {like}人がいいねを押しました
                    </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}: コメント</span>
                </div>
            </idv>
        </div>
        
    </div>
    )
}
