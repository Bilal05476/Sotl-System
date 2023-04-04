export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // for testting
  darkTheme: false,
  users: [],
  allObs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "CLEAR_USER":
      return {
        ...state,
        user: null,
      };
    case "SET_OBS":
      return {
        ...state,
        allObs: action.payload,
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    default:
      return state;
  }
};

export default reducer;
