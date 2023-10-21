import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import UserRepository from "../repositorys/UserRepository.js";
//@desc Auth user/set token
//@route POST /api/users/auth
//@access public

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await UserRepository.findByEmail({email})

  

  if (user && (await UserRepository.matchPasswords(user,password))) {

    generateToken(res, user._id);

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,
      
      blocked: user.blocked,
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

  const userExists = await UserRepository.findByEmail({email})

  if (userExists) {

    res.status(400);

    throw new Error("User already exists");

  }

  const user = await UserRepository.createUser({ name, email, password, blocked: false }); 

  if (user) {

    generateToken(res, user._id);

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,

      blocked: user.blocked,
  
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

const getTrainers=asyncHandler(async(req,res)=>{

  const trainers=await UserRepository.getTrainers();

  if(trainers){

    res.status(200).json({trainers})
  }else{

    res.status(401);

    throw new Error("Invalid user data");

  }
})

export { authUser, registerUser, logoutUser, profile,getTrainers };
