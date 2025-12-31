import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res:Response) => {
    res.send("Api is running...")
})

export default app;