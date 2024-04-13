import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState from React library
import { login } from "../services/api"; // Importing the login function from the api service
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import { ToastContainer, toast } from "react-toastify"; // Importing ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify
import Header from "./partials/Header";
import background from "./images/pattern.jpg";

function Login() {
  const navigation = useNavigate(); // Using the useNavigate hook from react-router-dom to navigate

  // State for form data
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // useEffect to redirect if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, [navigation]); // Dependency array includes navigation and user

  // State for errors
  const [errors, setErrors] = useState(null);

  // Function to handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const result = await login(form);
    console.log("form", result);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        toast.success(result.data.message);
        localStorage.setItem("user", JSON.stringify(result.data.data));
        setTimeout(() => {
          navigation("/");
        }, 2000); // Delay navigation for 2 seconds (2000 milliseconds)
        return;
      } else if (result.data.status === 201) {
        setErrors(result.data.data);
        toast.error(result.data.message); // Display error message using toast
      } else if (result.data.status === 202) {
        toast.info(result.data.message); // Display info message using toast
      }
    } else {
      toast.error("Something went wrong!"); // Display error message using toast
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
        <ToastContainer /> {/* ToastContainer for displaying notifications */}
        <div className="row justify-content-center my-5">
          <div
            className="col-lg-5 card border-dark mt-5 text-center"
            style={{ backgroundColor: "rgb(255, 150, 100)" }}
          >
            <div
              className="card-header h4"
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#990000",
              }}
            >
              Login Form
            </div>
            <div className="card-body">
              <h4
                className="card-title"
                style={{
                  fontSize: "50px",
                  color: "rgb(129, 0, 252)",
                }}
              >
                Welcome to Todo Task Manager!
              </h4>
              <div
                className="mb-3"
                style={{
                  fontSize: "20px",
                  color: "rgb(38, 0, 27)",
                }}
              >
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email Address or Username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email or Username"
                />
                {errors?.username && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.username.msg}
                  </small>
                )}
              </div>
              <div
                className="mb-3"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "rgb(38, 0, 27)",
                }}
              >
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                />
                {errors?.password && (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.password.msg}
                  </small>
                )}
              </div>

              <button
                type="button"
                className="btn mt-3"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "rgb(129, 0, 52)",
                  color: "rgb(255, 246, 0)",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
