import type {Request, Response} from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { createUserSevice, loginUserSevice } from "../services/user";



const createUser = asyncWrapper(
    async(req: Request, res: Response) => {
        const {first_name, middle_name, last_name, email, phone_number, password,role} = req.body;
        const  user = await createUserSevice({
            first_name,
            middle_name,
            last_name,
            email,
            phone_number,
            password,
            role
        })

        res.status(201).json({
            status: 'ok',
            message: 'User created successfully',
            data: user
        })
    }
);

const loginUser = asyncWrapper(
    async(req: Request, res: Response) => {
        const {email, phone_number,password} = req.body;
        const data = await loginUserSevice({phone_number,email, password})

        res.status(200).json({
            status: 'ok',
            data: data,
        })
    }
)


export { createUser, loginUser};