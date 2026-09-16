import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore.js";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitForm(data) {
    try {
      let res = await axios.post(
        "https://skillcheck-ai-project-groq.onrender.com/user-api/login",
        data,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setUser(res.data.payload);
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }

      console.log(err, "err in login submit form [FRONTEND]...");
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
              backgroundColor: "var(--secondary)",
              color: "white",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h3 className="text-center mb-4">Login</h3>
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
                Login
              </button>
            </div>

            <div className="text-center mt-3">
              <p className="mb-1">Don't have an account?</p>

              <Link to="/register" className="text-decoration-none text-info">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
