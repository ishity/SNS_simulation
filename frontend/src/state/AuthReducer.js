const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                //fetching : 情報を取得するのかしないのかの判定
                // login時は取得済みなのでfalse
                error: false,
            };
        case "LOGIN_ERROR":
            return{
                user: null,
                isFetching: false,
                error: action.payload,
            };
        default: 
            return state;
    }
};

export default AuthReducer;