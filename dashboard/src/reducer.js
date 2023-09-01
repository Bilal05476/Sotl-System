export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  darkTheme: false,
  allObs: [],
  userData: null,
  usersandcourses: null,
  notifications: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS_COURSES":
      return {
        ...state,
        usersandcourses: action.payload,
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
    case "TOGGLE_THEME":
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "OPEN_NOTIFICATION":
      const notificationIndex = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      const updatedNotifications = [...state.notifications];
      updatedNotifications[notificationIndex] = {
        ...updatedNotifications[notificationIndex],
        open: true,
      };
      return {
        ...state,
        notifications: updatedNotifications,
      };

    default:
      return state;
  }
};

export default reducer;
