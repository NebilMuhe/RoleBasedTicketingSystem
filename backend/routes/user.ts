import express from "express";
import { createUser, loginUser } from "../controllers/user";
import { validateData } from "../middleware/validationMiddleware";
import { loginSchema, userSchema } from "../schema/user";

const router = express.Router();

router.post('/signup', validateData(userSchema), createUser);
router.post('/login', validateData(loginSchema), loginUser);

export default router;