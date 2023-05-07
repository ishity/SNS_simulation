const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// 投稿を作成する
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿を更新する
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // POSTIDを取得
        if(post.userId === req.body.userId){
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿編集に成功しました！");
        } else {
            return res.status(403).json("あなたは他の人の投稿を編集できません")
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

// 投稿を削除する
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // POSTIDを取得
        if(post.userId === req.body.userId){
            await post.remove();
            return res.status(200).json("投稿削除に成功しました！");
        } else {
            return res.status(403).json("あなたは他の人の投稿を削除できません")
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});


// 特定の投稿を削取得する
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // POSTIDを取得
        return res.status(200).json(post);
    } catch (err) {
        return res.status(403).json(err);
    }
});


// 特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => { 
    const post = await Post.findById(req.params.id); // post情報を取得
    if(!post.likes.includes(req.body.userId)) {      // すでにいいねしていない場合
        try {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                }
            });
            return res.status(200).json("いいねに成功しました！");
        } catch (err) {
        return res.status(500).json(err);
        } 
    } else {                                         // いいねしているuserIdを取り除く
        try {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                }
            });
            return res.status(200).json("いいねを外すのに成功しました！");
        } catch (err) {
            return res.status(500).json(err);
        }
    }
});

// プロフィール専用のタイムラインの取得
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username}); 
        const posts = await Post.find({ userId: user._id, });
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
});


// タイムラインの投稿を取得する
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId); // ログインユーザーの情報を取得
        const userPosts = await Post.find({ userId: currentUser._id, });
        
        // 自分がフォローしている人の投稿内容を全て取得
        const friendPosts = await Promise.all( // Promise.all()は、複数の非同期処理を並列で実行し、全ての処理が完了したら結果を返す
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;