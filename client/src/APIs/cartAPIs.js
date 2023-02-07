import axios from "axios";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
// const endPoint = process.env.REACT_APP_END_POINT;
const endPoint = "http://localhost:8001";
console.log("🚀 ~ file: productAPIs.js:4 ~ endPoint", endPoint);

const auth = {
  headers: { Authorization: `Bearer ${token}` },
};

export const viewMyCart = async () => {
  try {
    const res = await axios.get(`${endPoint}/cart/${userId}`, auth);
    return res?.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const addToCart = async (productId) => {
  try {
    const res = await axios.post(
      `${endPoint}/cart/${userId}`,
      { productId },
      auth
    );
    return res?.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const pay = async () => {
  try {
    const res = await axios.post(
      `${endPoint}/pay/${userId}`,
      { amount: 1 * 100 }
      //   auth
    );
    return res?.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
