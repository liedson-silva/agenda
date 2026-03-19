import express from "express";
import cors from "cors";
import connectDB from "./config/connectDb.js";
import userRouter from './routes/user.route.js';
import clientRouter from "./routes/client.route.js";

const app = express()
app.use(cors({
    credentials: true,
    origin: "*"
}))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Servidor comunicando' }));
app.use('/user', userRouter);
app.use('/client', clientRouter);

const PORT = 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em 'http://localhost:${PORT}'`);
    });
});