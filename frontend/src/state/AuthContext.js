// Stateの初期値の状態, 状態をどのコンポーネントからでもアクセスできるようにする
import {createContext, useEffect, useReducer} from 'react';
import AuthReducer from './AuthReducer';


// 最初のユーザー状態を定義
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null || undefined,
    // user: {
    //     _id: "63af99082f4e5fd8bc22bcbd",
    //     username: "ishity",
    //     email: "yuri1121isty1206@gmail.com",
    //     password: "abcdef",
    //     profilePicture: "/person/1.jpeg",
    //     coverPicture: "",
    //     followers: [],
    //     followings: [],
    //     isAdmin: false,
    // },
    isFetching: false,
    error: false,
};

// 状態をグローバルに管理する
// 初期値、最初のstate
export const AuthContext = createContext(initialState);


// 変更後のstate, 状態が変わったらdispatchを呼び出す
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // stateが変わるごとにlocal strageを変更
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    // reducer関数と初期値を渡す
    return(
        <AuthContext.Provider 
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error:state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
