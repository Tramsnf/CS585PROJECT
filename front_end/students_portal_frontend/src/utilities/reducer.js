export const initialState = {
    user: null,
    notifications: []
}


const reducer = (state, action) => {
  console.log(state,action)
    switch(action.type){
        case "SET_USER":
            return {
              ...state, user: action.user,
            };
        case "REMOVE_USER":
            return {
              ...state, user: null
            };
        case "ADD_NOTIFICATIONS":
            return {
              ...state, notifications :[...action.notifications],
            };
        default:
            return state;
    }
    
}

export default reducer;