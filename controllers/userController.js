import User from "../models/userModel.js";
const createUser = async(req, res) => {
    try {
        const user = req.body;

        if (!user.name || user.name.trim() === '') {
            return res.status(400).json({ message: "User name es requerido" });
        }
        if (!user.lastName || user.lastName.trim() === '') {
            return res.status(400).json({ message: "User last name es requerido" });
        }
        if (!user.email || user.email.trim() === '') {
            return res.status(400).json({ message: "User email es requerido" });
        }
        if (!user.password || user.password.trim() === '') {
            return res.status(400).json({ message: "User password es requerido" });
        }
        if (!user.phoneNumber || user.phoneNumber.trim() === '') {
            return res.status(400).json({ message: "User phone number es requerido" });
        } else if (user.phoneNumber.length > 15 || user.phoneNumber.length < 10) {
            return res.status(400).json({ message: "User phone number debe contar con màs de 10 caracteres y menos de 15" });
        }
        if (!user.dateOfBirth || isNaN(Date.parse(user.dateOfBirth))) {
            return res.status(400).json({ message: 'User date of birth es requerido, intenta enviearlo con este formato "dateOfBirth":"12-02-1998"' });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).json({ newUser });

    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                const duplicatedEmail = error.keyValue.email;
                return res.status(400).json({ message: `Ya existe un usuario con el correo electrónico ${duplicatedEmail}`, data: {} });
            } else if (error.keyPattern.phoneNumber) {
                const duplicatedPhoneNumber = error.keyValue.phoneNumber;
                return res.status(400).json({ message: `Ya existe un usuario con el número de teléfono ${duplicatedPhoneNumber}`, data: {} });
            }
        }
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
};


async function getUsers(req, res) {
    try {

        const users = await User.find()
        console.log(users)
        res.status(200).json({ message: 'Lista de usuarios', data: users });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lamentamos la molestia, hubo un error ', error, data: [] });
    }
}

const getUserById = async(req, res) => {
    try {

        const id = req.params.id;
        const user = await User.findById(id)
        if (user) {
            res.status(200).json({ message: 'Ok', data: user });
        } else {
            res.status(404).json({ message: 'Recurso no encontrado', data: {} });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}
const deleteUserById = async(req, res) => {
    try {

        const id = req.params.id;
        const plan = await User.findByIdAndDelete(id)
        res.status(200).json({ message: 'Deleted', data: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}

const updateUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const userOld = req.body;
        const user = await User.findByIdAndUpdate(id, userOld);
        if (user) {
            res.status(200).json({ message: 'Usuario actualizado', data: user });
        } else {
            res.status(404).json({ message: 'No se encontró un usuario', data: {} });
        }
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico', data: {} });
            } else if (error.keyPattern.phoneNumber) {
                res.status(400).json({ message: 'Ya existe un usuario con este número de teléfono', data: {} });
            }
        } else {
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    }
};




export { createUser, getUsers, getUserById, deleteUserById, updateUserById }