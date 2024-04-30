import Category from "../models/categoryModel.js";
async function createCategory(req, res) {
    try {

        const category = req.body;

        if (!category.name || category.name.trim() === '') {
            return res.status(400).json({ message: "Category name es requerido" });
        } else if (!category.description || category.description.trim() === '') {
            return res.status(400).json({ message: "Category description es requerido" });
        }

        const newCategory = new Category(req.body);
        await newCategory.save();

        res.status(200).json({ newCategory });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lamentamos la molestia, hubo un error ', error, data: [] });
    }
}

async function getCategories(req, res) {
    try {

        const categories = await Category.find()
        console.log(categories)
        res.status(200).json({ message: 'Lista de tus categorias:', data: categories });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}
const getCategoryById = async(req, res) => {
    try {

        const id = req.params.id;
        const category = await Category.findById(id)
        if (category) {
            res.status(200).json({ message: 'Ok', data: category });
        } else {
            res.status(404).json({ message: 'Recurso no encontrado', data: {} });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}
const deleteCategoryById = async(req, res) => {
    try {

        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id)
        res.status(200).json({ message: 'Deleted', data: category });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}
const updateCategoryById = async(req, res) => {
    const id = req.params.id;
    const categoryOld = req.body;
    const category = await Category.findByIdAndUpdate(id, categoryOld);
    if (category) {
        res.status(200).json({ message: 'Categoria Actualizado', data: category });
    } else {
        res.status(404).json({ message: 'No se encontro ua categoria', data: {} });
    }
}
export { createCategory, getCategories, getCategoryById, deleteCategoryById, updateCategoryById }