export const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  // for testting
  user: true,
  darkTheme: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    // case "SET_USER":
    //   return {
    //     ...state,
    //     user: action.user,
    //   };

    // for testing
    case "SET_USER":
      return {
        ...state,
        user: !state.user,
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
