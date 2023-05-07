// ユーザー入力に応じたアクションの設定
export const LoginStart = (user) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    pyload: user,
})

export const LoginError = (user) => ({
    type: "LOGIN_ERROR",
    payload: error, // 状態を返すための
})