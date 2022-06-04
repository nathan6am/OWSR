const initialState = {
    isOpen: false,
    page: "sign-in"
}

import * as actions from "./actions"

export default function authModalReducer (state=initialState, action) {
    switch (action.type) {
        case actions.SHOW_SIGNIN:
            return {
                isOpen: true,
                page: "sign-in"
            }
        case actions.SHOW_SIGNUP:
            return {
                isOpen: true,
                page: "sign-up"
            }
        case actions.SHOW_COMPLETE_PROFILE: {
            return {
                isOpen: true,
                page: "complete-profile"
            }
        }
        case actions.HIDE_AUTH_MODAL:
            return {
                ...state,
                isOpen: false
            }
            
        default:
            return state
    }
}