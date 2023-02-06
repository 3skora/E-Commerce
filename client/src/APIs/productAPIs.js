import axios from "axios";
const token = localStorage.getItem("token");
// const endPoint = process.env.REACT_APP_END_POINT;
const endPoint = "http://localhost:8001";
console.log("🚀 ~ file: productAPIs.js:4 ~ endPoint", endPoint);

const auth = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${endPoint}/products/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${endPoint}/products`);
    return res?.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
