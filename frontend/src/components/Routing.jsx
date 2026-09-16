import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layout.jsx";
import Profile from "../pages/Profile.jsx";
import History from "../pages/History.jsx";
const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Quiz = lazy(() => import("../pages/Quiz.jsx"));
const Logout = lazy(() => import("../pages/Logout.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const AttemptQuiz = lazy(() => import("../pages/AttemptQuiz.jsx"));
const EntireQuizDetails = lazy(() => import("./EntireQuizDetails.jsx"));
import ProtectedRoute from "../pages/ProtectedRoute.jsx";
function Routing() {
  const browserRouterObj = createHashRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Home></Home>
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense>
              <Login></Login>
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register></Register>
            </Suspense>
          ),
        },
        {
          path: "quiz",
          element: (
              <Suspense>
                <Quiz></Quiz>
              </Suspense>         
          ),
        },
        {
          path: "history",
          element: (
            <ProtectedRoute>   
                <History></History>
            </ProtectedRoute>
          ),
        },
        {
          path: "logout",
          element: (
            <ProtectedRoute>
              <Suspense>
                <Logout></Logout>
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
                <Profile></Profile>
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense>
              <Contact></Contact>
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense>
              <About></About>
            </Suspense>
          ),
        },
        {
          path: "attempt-quiz",
          element: (
            <ProtectedRoute>
              <Suspense>
                <AttemptQuiz></AttemptQuiz>
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "entire-quiz-details",
          element: (
            <ProtectedRoute>
              <Suspense >
                <EntireQuizDetails></EntireQuizDetails>
              </Suspense>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouterObj} />;
}

export default Routing;
