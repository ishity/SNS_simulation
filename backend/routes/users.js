const router = require("express").Router();
const User = require("../models/User")

// Ceate Read Update Delete -> CRUD
// ユーザー情報の更新
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){ // paramsはURLのidを取得する
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body, // $setはスキーマ全てを更新するという意味
            });
            res.status(200).json("ユーザー情報が更新されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
});

// ユーザー情報の削除
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){ // paramsはURLのidを取得する
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            res.status(200).json("ユーザー情報が削除されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を削除できます");
    }
});


// ユーザー情報の取得
// router.get("/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         const { password, updatedAt, ...other } = user._doc; // 分割代入
//         return res.status(200).json(other);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });

//クエリでユーザー情報を取得
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {

        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username: username});

        const { password, updatedAt, ...other } = user._doc; // 分割代入
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});


// ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {                              // 自分のアカウントではない場合 
        try {
            const user = await User.findById(req.params.id);             // これからフォローするユーザー
            const currentUser = await User.findById(req.body.userId);    // 自分のアカウント
            if(!user.followers.includes(req.body.userId)) {              // フォロワーに自分のアカウントが含まれていない場合
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    }
                });
                return res.status(200).json("フォロに成功しました！");
            } else {
                return res.status(403).json("あなたはすでにフォローしています");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォローすることはできません");
    } 
});

// ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {                             // 自分のアカウントではない場合 
        try {
            const user = await User.findById(req.params.id);            // これからフォローするユーザー
            const currentUser = await User.findById(req.body.userId);   // 自分のアカウント
            if(user.followers.includes(req.body.userId)) {              // フォロワーに存在したらフォローをはずせる
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    }
                });
                return res.status(200).json("フォロー解除しました！");
            } else {
                return res.status(403).json("このユーザーはフォロー解除できません");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォロー解除することはできません");
    } 
});



// router.get("/", (req, res) => {
//     res.send("user router");
// });


module.exports = router;