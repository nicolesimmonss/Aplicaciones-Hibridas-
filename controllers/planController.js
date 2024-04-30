import Plan from "../models/planModel.js";
async function createPlan(req, res) {
    try {

        const plan = req.body;

        if (!plan.name || plan.name.trim() === '') {
            return res.status(400).json({ message: "Plan name es requerido" });
        }
        if (!plan.description || plan.description.trim() === '') {
            return res.status(400).json({ message: "Plan description es requerido" });
        }
        if (!plan.price || isNaN(plan.price)) {
            return res.status(400).json({ message: "Plan price es requerido y debe ser un numero" });
        }
        if (!plan.category_id || isNaN(plan.category_id)) {
            return res.status(400).json({ message: "Plan category_id es requerido y debe ser un numero" });
        }

        const newPlan = new Plan(req.body);
        await newPlan.save();

        res.status(200).json({ newPlan });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}

async function getPlans(req, res) {
    try {

        const plans = await Plan.find()
        console.log(plans)
        res.status(200).json({ message: 'Lista de Planes', data: plans });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lamentamos la molestia, hubo un error ', error, data: [] });
    }
}

const getPlanById = async(req, res) => {
    try {

        const id = req.params.id;
        const plan = await Plan.findById(id)
        if (plan) {
            res.status(200).json({ message: 'Ok', data: plan });
        } else {
            res.status(404).json({ message: 'Recurso no encontrado', data: {} });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}
const deletePlanById = async(req, res) => {
    try {

        const id = req.params.id;
        const plan = await Plan.findByIdAndDelete(id)
        res.status(200).json({ message: 'Deleted', data: plan });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}

const updatePlanById = async(req, res) => {
    const id = req.params.id;
    const planOld = req.body;
    const plan = await Plan.findByIdAndUpdate(id, planOld);
    if (plan) {
        res.status(200).json({ message: 'Plan Actualizado', data: plan });
    } else {
        res.status(404).json({ message: 'No se encontro un plan', data: {} });
    }
}
export { createPlan, getPlans, getPlanById, deletePlanById, updatePlanById }