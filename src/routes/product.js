import express from "express";
import { getAll, get, remove, add, update } from "../controllers/product.js";
const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.delete("/products/:id", remove);
router.post("/products", add);
router.patch("/products/:id", update);

export default router;
