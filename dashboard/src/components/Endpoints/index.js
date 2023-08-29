// import { toast } from "react-toastify";
import { successes, errors } from "../../constants/Toasters";
// import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const BASEURL = process.env.REACT_APP_BASE_URL;

export async function fetchUserData(id, dispatch) {
  try {
    const res = await fetch(`${BASEURL}/user/${id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    dispatch({
      type: "SET_USER_DATA",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchCoursesAndUsers(dispatch, department, role) {
  try {
    const usercourses = await fetch(`${BASEURL}/data/${role}/${department}`, {
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

export async function fetchObservation(setObs, id) {
  try {
    const res = await fetch(`${BASEURL}/observation/${id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();
    if (data.error) {
      errors(data.error);
    } else {
      setObs(data);
      // console.log(data);
    }
  } catch (err) {
    errors(err);
  }
}

export async function startScheduling(
  facultyId,
  observationsId,
  courseId,
  toastId,
  setObsDetail
) {
  try {
    const res = await fetch(`${BASEURL}/observation/scheduling`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ facultyId, observationsId, courseId }),
    });

    const data = await res.json();
    if (data.error) {
      toast.dismiss(toastId.current);
      errors(data.error);
    } else {
      toast.dismiss(toastId.current);
      successes("Scheduling Created Successfully!");
      fetchObservation(setObsDetail, observationsId);
    }
  } catch (err) {
    toast.dismiss(toastId.current);
    errors("Something Went Wrong, Try Again!");
  }
}

export async function updateScheduling(facultyId, observationsId, errors) {
  try {
    const res = await fetch(`${BASEURL}/observation/scheduling`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ facultyId, observationsId }),
    });

    const data = await res.json();
    if (data.error) {
      errors(data.error);
    }
  } catch (err) {
    errors(err);
  }
}

export async function submitTemplate(
  templateResponse,
  templateId,
  editedById,
  observationsId,
  setObs,
  loader,
  type
) {
  let endPoint = "";
  if (type === "Reflection") {
    endPoint = "post-scheduling";
  } else {
    endPoint = "scheduling";
  }
  try {
    const res = await fetch(`${BASEURL}/observation/${endPoint}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        templateResponse,
        templateId,
        editedById,
        observationsId,
      }),
    });

    const data = await res.json();
    if (data.error) {
      errors(data.error);
      loader(false);
    } else {
      loader(false);
      successes(data.message);
      fetchObservation(setObs, observationsId);
    }
  } catch (err) {
    errors(err);
    loader(false);
  }
}

export async function submitScore(
  role,
  rubricsFinal,
  loader,
  informedId,
  observationsId,
  setObs
) {
  const response = {
    informedId,
    rubricsFinal,
    role,
  };

  try {
    const res = await fetch(`${BASEURL}/observation/informed`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(response),
    });

    const data = await res.json();
    if (data.error) {
      errors(data.error);
      loader(false);
    } else {
      loader(false);
      successes(data.message);
      fetchObservation(setObs, observationsId);
    }
  } catch (err) {
    errors(err);
    loader(false);
  }
}

export async function fetchDepartments(id, setAllDept) {
  const res = await fetch(`${BASEURL}/department`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  if (!data.message) {
    setAllDept(data);
  }
}

export async function uplaodArtifact(formData, id) {
  await axios
    .post(`${BASEURL}/upload-artifact/${id}`, formData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
