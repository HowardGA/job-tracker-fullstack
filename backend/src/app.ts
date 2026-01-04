import express from "express";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import jobRoutes from './routes/jobRoutes';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);

app.get("/", (_req: Request, res:Response) => {
    res.send("Api is running...")
})

export default app;