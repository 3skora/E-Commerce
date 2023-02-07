import axios from "axios";

const token = localStorage.getItem("token");
// const endPoint = process.env.REACT_APP_END_POINT;
const endPoint = "http://localhost:8001";

const auth = {
  headers: { Authorization: `Bearer ${token}` },
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${endPoint}/users/login`, data);
    localStorage.setItem("token", res?.data?.token);
    localStorage.setItem("userId", res?.data?.userId);
    return res;
  } catch (err) {
    if (err?.response?.data?.message)
      return {
        success: false,
        message: err?.response?.data?.message,
        validators: err?.response?.data?.validators,
      };
    return {
      success: false,
      message: "something went wrong!",
    };
  }
};
