import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { Types as mongooseTypes } from "mongoose";
const { ObjectId } = mongooseTypes;
//@desc Auth user/set token
//@route POST /api/users/auth
//@access public

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPasswords(password))) {
    generateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,

      name: admin.name,

      email: admin.email,

      image: admin.imagePath,
    });
  } else {
    res.status(401);

    throw new Error("Invalid email or password");
  }
});

//@user logout
//@ route post api/users/logout
//@access public

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "user logged out" });
});

//@user get user profile
//@ route GET api/users/profile
//@access private(need to have access and the valid tokken)

const profile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,

    name: req.user.name,

    email: req.user.email,
  };

  res.status(200).json(user);
});

//@user update user profile
//@ route PUT api/users/profile
//@access private(need to have access and the valid tokken)
const manageUser = asyncHandler(async (req, res) => {
  console.log(req.file, "kkkkkkkk");
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.file) {
      user.imagePath = req.file.filename || user.imagePath;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.imagePath,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const users = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user) {
      await user.deleteOne({ _id: req.body.userId });
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const blockUser = asyncHandler(async (req, res) => {
  try {
    const userId = new ObjectId(req.body.userId);
    const user = await User.findById(userId);
    if (user) {
      user.blocked = true;
      await user.save();
      res.status(200).json({ message: "User blocked successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.body.userId);
  const user = await User.findById(userId);
  if (user) {
    user.blocked = false;
    await user.save();
    res.status(200).json({ message: "user unblocked" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
export { authAdmin, logoutAdmin, users, blockUser, unblockUser };
