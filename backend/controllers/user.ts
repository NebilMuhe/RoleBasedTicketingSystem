import type {Request, Response} from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { createUserSevice, loginUserSevice } from "../services/user";



const createUser = asyncWrapper(
    async(req: Request, res: Response) => {
        const {firstName, middleName, lastName, email, phoneNumber, password,role} = req.body;
        const  user = await createUserSevice({
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
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
        const {email, password} = req.body;
        const data = await loginUserSevice({email, password})

        res.status(200).json({
            status: 'ok',
            data: data,
        })
    }
)


export { createUser, loginUser};