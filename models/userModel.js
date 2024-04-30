import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    secondName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlenght: [10, "El numero debe contar con al menos 10 caracteres"],
        maxlenght: [15, "El numero debe contar con menos de 15 caracteres"],
    },
    dateOfBirth: {
        type: Date,
        required: true,
    }
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

export default User;