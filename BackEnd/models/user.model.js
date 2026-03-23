import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Provide password"],
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model("User", userSchema)

export default UserModel