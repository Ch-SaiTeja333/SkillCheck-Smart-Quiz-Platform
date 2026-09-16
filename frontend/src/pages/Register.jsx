import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useAuthStore();
  
  async function submitForm(data) {
    try {
      let res = await axios.post(
        "https://skillcheck-ai-project-groq.onrender.com/user-api/register",
        data,
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        // setUser(res.data.payload);
        // console.log('register......',res.data.payload);
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }

      console.log(err.message, "err in register submit form [FRONTEND]...");
    }
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <form
            onSubmit={handleSubmit(submitForm)}
            className="p-4 rounded shadow"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
            }}
          >
            <h3 className="text-center mb-4">Register</h3>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
                className="form-control"
              />

              {errors.email && (
                <p className="text-danger mt-1">Email is required</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <input
                type="text"
                {...register("userName", {
                  required: "UserName is Required",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                })}
                id="username"
                className="form-control"
              />

              {errors.userName && (
                <p className="text-danger mt-1">{errors.userName.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must not exceed 20 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-success w-100 quiz-btn" type="submit">
                Register
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-1">Already have an account?</p>

              <Link to="/login" className="text-decoration-none text-info">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
