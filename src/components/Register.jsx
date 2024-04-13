import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header";
import background from "./images/pattern.jpg";

function Register() {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, [navigation]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await register(form);

    if (result && result.status === 200) {
      if (result.data && result.data.status === 201) {
        // If there are errors, display them in the toast message
        setErrors(result.data.data);
        toast.error(result.data.message);
        return;
      } else if (result.data && result.data.status === 200) {
        // If no errors, show success message and delay navigation
        toast.success(result.data.message);
        localStorage.setItem("user", JSON.stringify(result.data.data));
        setTimeout(() => {
          navigation("/");
        }, 2000); // Delay navigation for 2 seconds (2000 milliseconds)
        return;
      } else if (result.data && result.data.status === 202) {
        toast.info(result.data.message);
        return;
      }
    } else {
      toast.error("Something Went Wrong! Please Try Again");
    }
  };

  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          width: "1000px",
          margin: "auto",
          paddingTop: "0px",
          paddingBottom: "15px",
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="row justify-content-center mt-5">
          <div
            className="col-lg-5 card  my-5 text-center"
            style={{ backgroundColor: "rgb(255, 150, 100)" }}
          >
            <div
              className="card-header h4 text-center"
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#990000",
              }}
            >
              Register For An Account!
            </div>
            <div className="card-body">
              <div className="form-group">
                <label
                  className="col-form-label"
                  style={{
                    fontSize: "20px",
                    color: "rgb(38, 0, 27)",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="form-control mt-4"
                  placeholder="Enter Your Name"
                />

                {errors?.name && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.name.msg}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label
                  className="col-form-label mt-3"
                  style={{
                    fontSize: "20px",
                    color: "rgb(38, 0, 27)",
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="form-control mt-3"
                  placeholder="Enter Your Username"
                />
                {errors?.username && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.username.msg}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label
                  className="col-form-label mt-3"
                  style={{
                    fontSize: "20px",
                    color: "rgb(38, 0, 27)",
                  }}
                >
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  className="form-control mt-3"
                  placeholder="Enter Your E-mail"
                />
                {errors?.email && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.email.msg}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label
                  className="col-form-label mt-3"
                  style={{
                    fontSize: "20px",
                    color: "rgb(38, 0, 27)",
                  }}
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  onChange={handleInputChange}
                  className="form-control mt-4"
                  placeholder="Enter Your Password"
                />
                {errors?.password && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.password.msg}
                  </small>
                )}
              </div>

              <div className="row justify-content-md-center form-group mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className=" col-sm-4 btn btn-outline-warning "
                  style={{
                    backgroundColor: "rgb(129, 0, 52)",
                    color: "rgb(255, 246, 0)",
                  }}
                >
                  Register Now!
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />{" "}
        {/* Render ToastContainer component at the end of the component */}
      </div>
    </>
  );
}

export default Register;
