import axios from "axios";

export const loginCall = async(user, dispatch) => {
    dispatch ({type: "LOGIN_START"});
    try{
        const response = await axios.post("auth/login", user);
        dispatch({type: "LOGIN_SUCCESS", payload: response.data});
        //dispatchで状態更新
    } catch(err){
        dispatch({type: "LOGIN_ERROR", payload: "err"});
    }
};