//! mini express
import express from "express";
import mongoose from "mongoose";
import { Router } from "express";
import { userModel } from "../models/user-model.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
export const userRoutes = Router();
const { sign } = jwt;
//! define routes
//*REGISTER
userRoutes.post("/register", async (req, res) => {
  try {
    let userDetails = req.body;
    let isExist = await userModel.findOne({ email: userDetails.email });
    if (isExist) {
      return res.status(409).json({
        message: "User already exists",
        payload: userDetails,
      });
    }
    let hassedPassword = await hash(userDetails.password, 10);
    userDetails.password = hassedPassword;
    let newUser = new userModel(userDetails);
    await newUser.save();
    // console.log('registration...',newUser);
    const responseUser = {
      id: newUser._id,
      ...newUser.toObject(),
    };
    // console.log('after modification ...',responseUser);
    return res.status(201).json({
      message: "User registered successfully",
      payload: responseUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-register route [BACKEND]...${err.message}`,
    });
  }
});

//*LOGIN
userRoutes.post("/login", async (req, res) => {
  try {
    let userDetails = req.body;
    let isExist = await userModel.findOne({ email: userDetails.email });
    if (isExist == null) {
      return res.status(404).json({
        message: "Invalid Email",
        payload: userDetails,
      });
    }

    let ispassword = await compare(userDetails.password, isExist.password);
    if (ispassword == false) {
      return res.status(401).json({
        message: "Invalid password",
        payload: userDetails,
      });
    }
    let newUserDetails = {
      email: isExist.email,
      id: isExist._id,
    };
    // console.log('....',newUserDetails)
    let token = sign({ payload: newUserDetails }, "abcde", { expiresIn: "1d" });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    // console.log("newuser login...... ",newUserDetails);
    return res.status(200).json({
      message: "user logged in successfully",
      payload: {
        id: isExist._id,
        email: isExist.email,
        token: token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-login route [BACKEND]...${err.message}`,
    });
  }
});

//*LOGOUT
userRoutes.post("/logout", verifyToken, (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    return res.status(204).json({
      message: "user logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-logout route [BACKEND]...${err.message}`,
    });
  }
});

//* me route
userRoutes.get("/me", verifyToken, (req, res) => {
  try {
    let user = req.user;
    // console.log("me.......",user)
    return res.status(200).json({
      message: "user profile fetched successfully",
      payload: user.payload,
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-profile route [BACKEND]...${err.message}`,
    });
  }
});

//* Get userName
userRoutes.post("/getUserName", async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email);
    const record = await userModel.findOne({ email });
    // console.log(record);
    if (!record) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({
        message: "User name fetched successfully",
        payload: record.userName,
      });
  } catch (err) {
    console.log("err in getting user name--user-api Backend...", err.message);
  }
});
