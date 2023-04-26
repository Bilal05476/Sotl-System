export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // for testting
  darkTheme: false,
  users: [],
  allObs: [],
  courses: [],
  userData: null,
  logoutState: false,
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
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
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
    case "SET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };

    case "LOGOUT":
      return {
        ...state,
        logoutState: !state.logoutState,
      };
    default:
      return state;
  }
};

export default reducer;
