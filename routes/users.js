import express from "express";
const router = express.Router();

import { validate, getUsers, getUser } from "../controllers/user.js";

router.get("/", getUsers);

router.get("/:id", validate('getUser'),getUser);

router.post("/", (req, res) => {});

export default router;
