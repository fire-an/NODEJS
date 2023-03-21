import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", productRouter);

export const viteNodeApp = app;
