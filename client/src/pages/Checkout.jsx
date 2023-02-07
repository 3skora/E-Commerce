import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pay } from "../APIs/cartAPIs.js";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Checkout() {
  const stripe = useStripe();
  const element = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  //   const [email, setEmail] = useState("");
  //   const [name, setName] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("Pay");
  const navigate = useNavigate();

  //   const handelErrorMessage = (error) => {
  //     if (error?.validators === undefined) setErrorMsg(error?.message);
  //     else {
  //       error?.validators?.forEach((element) => {
  //         element.param === "email" && setEmailError(element?.msg);
  //         element.param === "name" && setNameError(element?.msg);
  //       });
  //     }
  //   };

  //   const handelSubmit = async (e) => {
  //     e.preventDefault();

  //     const data = {
  //       email,
  //       name,
  //     };
  //     const res = await login(data);
  //     console.log("🚀 ~ file: Login.jsx:34 ~ handelSubmit ~ res", res);
  //     if (res?.data?.success) window.location.href = "/";
  //     // else handelErrorMessage(res);
  //   };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(
      "🚀 ~ file: Checkout.jsx:51 ~ handleChange ~ name",
      e.target.name
    );
    setCredentials({ ...credentials, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setSuccess("Processing...");

    const cardElement = element.getElement("card");
    const { name, phone, email, address } = credentials;
    const billingInfo = {
      name,
      phone,
      email,
      address: {
        line1: address,
      },
    };

    try {
      const paymentIntent = await axios.post("http://localhost:8001/pay", {
        amount: 1 * 100,
      });

      const paymentMethodObj = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingInfo,
      });

      if (paymentMethodObj.error) {
        setError(paymentMethodObj.error.message);
        setProcessing(false);
        setSuccess("Pay");
        return;
      }

      const confirmedPayment = await stripe.confirmCardPayment(
        paymentIntent.data,
        {
          payment_method: paymentMethodObj.paymentMethod.id,
        }
      );
      if (confirmedPayment.error) {
        setError(confirmedPayment.error.message);
        setProcessing(false);
        setSuccess("Pay");
        return;
      }

      setSuccess("Success! Payment is Complete");

      setTimeout(() => {
        setSuccess("Pay");
        setProcessing(false);
        setCredentials({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
        cardElement.clear();
      }, 2000);
    } catch (error) {
      setError(error.message);
      setProcessing(false);
      setSuccess("Pay");
    }
  };

  const handleCardChange = (e) => {
    if (e.error) return setError(e.error.message);
    setError("");
  };

  return (
    <div className="pt-120 pb-120">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <form className="col-lg-9" onSubmit={handlePayment}>
            <div class="form-outline">
              <label class="form-label" for="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div class="form-outline">
              <label class="form-label" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                value={credentials.name}
                onChange={handleChange}
              />
            </div>

            <div class="form-outline">
              <label class="form-label" for="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                class="form-control"
                value={credentials.address}
                onChange={handleChange}
              />
            </div>

            <div class="form-outline">
              <label class="form-label" for="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                class="form-control"
                value={credentials.phone}
                onChange={handleChange}
              />
            </div>
            <p>{error}</p>

            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "20px",
                  },
                  invalid: {
                    color: "red",
                  },
                },
              }}
              onChange={handleCardChange}
            />

            <button
              type="submit"
              class="btn btn-block m-4 btn-primary"
              disabled={isProcessing}
            >
              {success}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
