import express from "express";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get("/", (_req: Request, res:Response) => {
    res.send("Api is running...")
})

export default app;