import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../APIs/loginAPI.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handelErrorMessage = (error) => {
    if (error?.validators === undefined) setErrorMsg(error?.message);
    else {
      error?.validators?.forEach((element) => {
        element.param === "email" && setEmailError(element?.msg);
        element.param === "password" && setPasswordError(element?.msg);
      });
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setErrorMsg("");
    setPasswordError("");

    const data = {
      email,
      password,
    };
    const res = await login(data);
    console.log("🚀 ~ file: Login.jsx:34 ~ handelSubmit ~ res", res);
    if (res?.data?.success) window.location.href = "/";
    else handelErrorMessage(res);
  };

  return (
    <div className="pt-120 pb-120">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <form className="col-lg-9" onSubmit={handelSubmit}>
            <div class="form-outline">
              <label class="form-label" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                class="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p class="mb-4 text-danger">{emailError}</p>

            <div class="form-outline">
              <label class="form-label" for="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                class="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p class="mb-4 text-danger">{passwordError || errorMsg}</p>
            <button
              type="submit"
              class="btn btn-block mb-4 btn-primary"
              //   style={{ backgroundColor: "#0079b3", color: "#fff" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
