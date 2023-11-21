import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserRepository from "../repositorys/UserRepository.js";

const protect = asyncHandler(async (req, res, next) => {

  let token;

  token = req.cookies.userjwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserRepository.findUserByIdForMiddleWare(decoded.userId);

      next();
    } catch (error) {
      res.status(401);

      throw new Error("not authorized,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorized,no token");
  }
});

const isBlocked = asyncHandler(async (req, res, next) => {

  let token;

  token = req.cookies.userjwt;


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserRepository.findUserByIdForMiddleWare(
        decoded.userId

      );

      if (!user.blocked) {

        next();

      } else {

        res.cookie("userjwt", "", { httpOnly: true, expires: new Date(0) });

        res.status(401);

        throw new Error("blocked by the admin");
        
      }
    } catch (error) {
      res.status(401);

      throw new Error("not authorizes,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorizes,no token");
  }
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
