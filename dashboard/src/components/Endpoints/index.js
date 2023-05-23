const BASEURL = process.env.REACT_APP_BASE_URL;

export async function fetchUserData(id, dispatch) {
  try {
    const res = await fetch(`${BASEURL}/user/${id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    console.log(data);
    dispatch({
      type: "SET_USER_DATA",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchCoursesAndUsers(dispatch) {
  try {
    const usercourses = await fetch(`${BASEURL}/courses-users/`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await usercourses.json();
    dispatch({
      type: "SET_USERS_COURSES",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTemplate(setPlan, id) {
  try {
    const template = await fetch(`${BASEURL}/template/${id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await template.json();
    setPlan(data.steps);
  } catch (err) {
    console.log(err);
  }
}
