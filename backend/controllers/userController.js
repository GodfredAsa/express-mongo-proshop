import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get Token
// route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    console.log(token);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// route /api/users/register
// @access public Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, password, email });
  if (user) {
    const token = generateToken(res, user._id);
    console.log(token);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data ");
  }
});

// @desc Logout user & clear cookies
// route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
  return res.send("User Profile ");
});

// @desc Update user profile
// route UPDATE /api/users/profile
// @access Private/Admin
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(res.user._id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    console.log("=============================")
    console.log(updatedUser)
    console.log("=============================")

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      idAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get all users
// route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password -__v');
  return res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    try {
          const deletedUser = await User.findByIdAndDelete(req.body.userId);
          if(!deletedUser){
            res.status(404);
            throw new Error("User not found")
          }else{
            res.status(200).json({ message: "user deleted"} ) 
        }
    } catch (error) {
      console.log(error.message);
    }
});

// @desc Get user by id
// route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  return res.send("Get User By ID");
});

// @desc Delete User
// route DELETE /api/users/:id
// @access Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  return res.send("Delete User");
});

// @desc Update User
// route UPDATE /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  return res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUserById,
  updateUser,
  deleteUser
};
