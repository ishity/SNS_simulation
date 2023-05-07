const express = require("express"); // require を呼んであげる
const app = express(); // appという変数にexpress関数を格納、express関数内のいろんなclassを使える
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 5000; // ポート番号を定義、3000番の港で開発
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // .envのコンフィグ関数を用意

// データベース接続
mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGOURL)
    .then(() => {
        console.log("DBと接続中・・・");
    }).catch((err) => {
        console.log(err);
    });


// ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

// コールバック関数を作る。reqはクライアントから来る、resはバックエンドサーバーからクライアントに返す
// スラッシュはエンドポイントと言われる。API。ブラウザのURlに打ち込むと、このGETメゾットが発動
app.get("/", (req, res) => {
    res.send("Hello express!"); //今回はブラウザがクライアントで、このファイルがバックエンド
});

// app.get("/users", (req, res) => {
//     res.send("Users express!"); //今回はブラウザがクライアントで、このファイルがバックエンド
// });

app.listen(PORT, () => console.log("サーバーが起動しました"));

