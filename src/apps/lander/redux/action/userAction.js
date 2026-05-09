// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';


// Action Creators
// Action Creators
export const setUser = (userId, role) => {
    return {
        type: SET_USER,
        payload: {
            
            userId,
            role
        }
    };
};

export const clearUser = () => {
    return {
        type: CLEAR_USER
    };
};
