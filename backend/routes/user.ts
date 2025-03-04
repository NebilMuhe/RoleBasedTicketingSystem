import express from "express";
import { createUser } from "../controllers/user";
import { validateData } from "../middleware/validationMiddleware";
import { userSchema } from "../schema/user";

const router = express.Router();

router.post('/signup', validateData(userSchema), createUser);

export default router;