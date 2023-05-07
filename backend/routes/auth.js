const router = require("express").Router();
const User = require("../models/User");


// ユーザー登録
router.post("/register", async (req, res) => {
    try {
            const newUser = await new User({    // awaitは非同期処理を同期処理にする、asyncとセットで使う
                username: req.body.username,    // requestに含まれるbody要素の中のusername
                email: req.body.email,          // requestに含まれるbody要素の中のemail
                password: req.body.password,    // requestに含まれるbody要素の中のpassword
            });

            const user = await newUser.save();  // newUserを保存する
            return res.status(200).json(user); // 200は成功したという意味
    } catch (err) {
        return res. status(500).json(err);      // 500はサーバー関連のjson形式のエラー
    }    });

// ログイン
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send("ユーザーが見つかりません");

        const vailedPassword = req.body.password === user.password; // パスワードが一致したらvailedPasswordにtrueを代入
        if (!vailedPassword) return res.status(400).json("パスワードが間違っています");

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get("/", (req, res) => {
//     res.send("auth router");
// });


module.exports = router;