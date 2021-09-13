import UserActionTypes from "./user.types";
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
        case UserActionTypes.SIGN_OUT_SUCCESS: 
            return {
                ...state,
                currentUser: null,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                error: action.payload
            };
        case UserActionTypes.SIGN_UP_START:
            return{
                ...state,
                isFetching: true,
                userCredentials: action.payload
            }
        case UserActionTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                isFetching: false,
                userCredentials: null
            }
        default:
            return state;
            
    }
};

export default userReducer;