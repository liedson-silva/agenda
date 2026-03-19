import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token não fornecido. Faça login.",
                error: true, success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.userId = decode._id;
        next();
    } catch (error) {
        console.log("Erro no JWT:", error.message);
        return res.status(500).json({
            message: "Sessão inválida ou expirada.",
            error: true, success: false
        });
    }
};

export default auth;