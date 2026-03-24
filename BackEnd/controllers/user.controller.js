import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function RegisterUser(req, res) {
    try {
        const { name, password, confirmPassword } = req.body;
        if (!name || !password || !confirmPassword) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos!",
                error: true, success: false
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "As senhas não coincidem!",
                error: true, success: false
            });
        }

        const user = await UserModel.findOne({ name });
        if (user) {
            return res.status(400).json({
                message: "Já existe usuário com este nome.",
                error: true, success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        const payload = { name, password: hashPassword };
        const newUser = new UserModel(payload);
        const save = await newUser.save();

        return res.json({
            message: "Usuário registrado com sucesso!",
            data: save, error: false, success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    }
}

export async function LoginUser(req, res) {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true, success: false
            });
        }

        const user = await UserModel.findOne({ name });
        if (!user) {
            return res.status(400).json({
                message: "Usuário não encontrado.",
                error: true, success: false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Senha incorreta.",
                error: true, success: false
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY_JWT, { expiresIn: '7d' });

        return res.json({
            message: "Login realizado com sucesso!",
            success: true, error: false, token: token,
            data: {
                name: user.name,
            },

        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    }
}
