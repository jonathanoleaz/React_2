import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {            /**we return the new state, only modifying currentUser prop */
                ...state,
                currentUser: action.payload
            }
            
    
        default:
            return state;
            
    }
};

export default userReducer;