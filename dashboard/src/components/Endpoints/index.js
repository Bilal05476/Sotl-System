// import { toast } from "react-toastify";
import { successes, errors } from "../../constants/Toasters";
// import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const BASEURL = process.env.REACT_APP_BASE_URL;

export async function fetchSotlData(dispatch, token) {
  try {
    const res = await fetch(`${BASEURL}/data/super-data`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    dispatch({
      type: "SET_USER_DATA",
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}

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

export async function fetchHodData(dispatch, department, role, userId) {
  try {
    const usercourses = await fetch(`${BASEURL}/data/${role}/${department}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await usercourses.json();
    fetchUserData(userId, dispatch);
    dispatch({
      type: "SET_USERS_COURSES",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTemplate(setPlan, type) {
  try {
    const template = await fetch(`${BASEURL}/template/${type}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await template.json();
    setPlan(data);
  } catch (err) {
    console.log(err);
  }
}

export async function updateTemplate(setPlan, type, body, loader) {
  try {
    const template = await fetch(`${BASEURL}/template/${type}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    const data = await template.json();
    setPlan(data);
    loader(false);
    successes("Updated Successfully!");
  } catch (err) {
    loader(false);
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
export async function deleteObservation(id, loader, navigate, token) {
  loader(true);
  try {
    const res = await fetch(`${BASEURL}/observation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.error) {
      errors(data.error);
      loader(false);
    } else {
      successes(data.message);
      loader(false);
      setTimeout(() => {
        navigate("/observations/list-observation");
      }, 1500);
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
  // console.log(templateResponse, templateId, editedById, observationsId, type);
  // return;
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

// informed
export async function submitScore(
  role,
  rubricsFinal,
  loader,
  informedId,
  observationsId,
  setObs
) {
  const response = {
    observationsId,
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
export async function doneScore(informedId, loader, observationsId, setObs) {
  const response = {
    observationsId,
    informedId,
    status: "Completed",
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
// un informed
export async function submitScore2(
  role,
  rubricsFinal,
  loader,
  uninformedId,
  observationsId,
  setObs
) {
  const response = {
    observationsId,
    uninformedId,
    rubricsFinal,
    role,
  };

  // console.log(response);
  // loader(false);
  // return;

  try {
    const res = await fetch(`${BASEURL}/observation/uninformed`, {
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
export async function doneScore2(uninformedId, loader, observationsId, setObs) {
  const response = {
    observationsId,
    uninformedId,
    status: "Completed",
  };

  try {
    const res = await fetch(`${BASEURL}/observation/uninformed`, {
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

export async function uplaodArtifact(
  formData,
  id,
  setObs,
  observationsId,
  setfile
) {
  await axios
    .post(`${BASEURL}/upload-artifact/${id}`, formData)
    .then((res) => {
      successes(res.data.message);
      fetchObservation(setObs, observationsId);
      setfile(null);
    })
    .catch((err) => errors(err.response.data));
}

export async function getEmailTemplate(setPlan, type, token, email) {
  try {
    const template = await fetch(`${BASEURL}/email/${type}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await template.json();
    setPlan(data);
    email(data.email);
  } catch (err) {
    console.log(err);
  }
}

export async function updateEmailTemplate(
  setPlan,
  type,
  token,
  email,
  body,
  loader
) {
  try {
    const template = await fetch(`${BASEURL}/email/${type}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await template.json();
    setPlan(data);
    email(data.email);
    loader(false);
    successes("Updated Successfully!");
  } catch (err) {
    loader(false);
    console.log(err);
  }
}

export async function createRubricScoring(id, loader, setObs) {
  loader(true);
  try {
    const template = await fetch(`${BASEURL}/observation/uninformed`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ observationsId: id }),
    });
    const data = await template.json();
    loader(false);
    successes(data.message);
    fetchObservation(setObs, id);
  } catch (err) {
    loader(false);
    console.log(err);
  }
}
