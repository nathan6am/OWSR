import * as actions from "./actions"
export const showAuthModal= (page) => {
    switch (page) {
        case "sign-in":
        return {
            type:actions.SHOW_SIGNIN
        }
        case "sign-up":
            return {
                type: actions.SHOW_SIGNUP
            }
        default:
            return {
                type:actions.SHOW_SIGNIN
            }
    }
}

export const hideAuthModal = () => {
    return {
        type: actions.HIDE_AUTH_MODAL
    }
}