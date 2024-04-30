import express from "express";
import { createUser, getUsers, getUserById, deleteUserById, updateUserById } from "../controllers/userController.js";
const router = express.Router();

router.use(express.json());

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export default router;