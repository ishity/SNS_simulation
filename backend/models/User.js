const mongoose = require("mongoose");

// スキーマ
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 25,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 50,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: { // ログイン情報
        type: Boolean,
        default: false,
    },
    desc: { // ディスクリプション、概要欄のこと
        type: String,
        max: 70,
    },
    city: { // どこに住んでいるのか
        type: String,
        max: 50,
    }
},
{ timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);