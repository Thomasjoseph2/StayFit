import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import UserRepository from "../repositorys/UserRepository.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserRepository.findUserByIdForMiddleWare(decoded.userId);

      next();
    } catch (error) {
      res.status(401);

      throw new Error("not authorizes,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorizes,no token");
  }
});

const isBlocked = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.blocked) {
    res.status(403); // Forbidden

    throw new Error("User is blocked. Please contact support for assistance.");
  }

  next();
});

const loginBlockCheck = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  const user = await UserRepository.findByEmail({ email });

  if (!user) {
    res.status(403); // Forbidden

    throw new Error("please signup to login");
  }

  if (user.blocked === true) {
    res.status(403); // Forbidden

    throw new Error("User is blocked. Please contact support for assistance.");
  }

  next();
});

export { protect, isBlocked, loginBlockCheck };
