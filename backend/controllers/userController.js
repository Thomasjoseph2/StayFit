import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//@desc Auth user/set token
//@route POST /api/users/auth
//@access public

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {

    generateToken(res, user._id);

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,

      // image: user.imagePath,
    });

  } else {

    res.status(401);

    throw new Error("Invalid email or password");
  }
});

//@desc new user registration
//route POST api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {

    res.status(400);

    throw new Error("user already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {

    generateToken(res, user._id);

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,

    });

  } else {

    res.status(401);

    throw new Error("Invalid user data");
  }
});

//@user logout
//@ route post api/users/logout
//@access public

const logoutUser = asyncHandler(async (req, res) => {

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
const updateUserProfile = asyncHandler(async (req, res) => {
   
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
export { authUser, registerUser, logoutUser, profile, updateUserProfile };
