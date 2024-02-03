import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
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
} from "../controllers/userController.js";
const router = express.Router();

// protected admin resource
router.route("/")
      .post(registerUser)
      .get(protect, admin, getUsers)
      .delete(protect, admin, deleteUser);

router.post("/auth", authUser);
router.post("/logout", logoutUser);

router.route("/profile")
      .get(protect, getUserProfile)
      .put(protect, updateUserProfile);

router.route("/:id")
      .delete(protect, admin, deleteUserById)
      .get(protect, admin, getUserById)
      .put(protect, admin, updateUser);

export default router;
