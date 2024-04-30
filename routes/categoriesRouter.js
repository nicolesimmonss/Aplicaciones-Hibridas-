import express from "express";
import { createCategory, getCategories, deleteCategoryById, updateCategoryById, getCategoryById } from "../controllers/categoryController.js";
const router = express.Router();

router.use(express.json());

router.get('/', getCategories)

router.get('/:id', getCategoryById)

router.post('/', createCategory)

router.put('/:id', updateCategoryById)

router.delete('/:id', deleteCategoryById)

export default router;