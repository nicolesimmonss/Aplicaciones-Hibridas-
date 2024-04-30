import express from "express";
import { createPlan, getPlans, getPlanById, deletePlanById, updatePlanById } from "../controllers/planController.js";
const router = express.Router();

router.use(express.json());

router.get('/', getPlans)

router.get('/:id', getPlanById)

router.post('/', createPlan)

router.put('/:id', updatePlanById)

router.delete('/:id', deletePlanById)

export default router;