import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCESS:
            return {            /**we return the new state, only modifying currentUser prop */
                ...state,
                currentUser: action.payload,
                error: null
            };
            
        case UserActionTypes.SIGN_IN_FAILURE:
            return{
                ...state,
                error: action.payload
            };
        default:
            return state;
            
    }
};

export default userReducer;