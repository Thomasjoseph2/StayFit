import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AdminRepository from "../repositorys/AdminRepository.js";

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.adminJwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_FOR_ADMIN);

      req.admin = await AdminRepository.findById(decoded.adminId);

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

export { protectAdmin };
