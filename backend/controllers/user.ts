import type {Request, Response} from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { createUserSevice } from "../services/user";



const createUser = asyncWrapper(
    async(req: Request, res: Response) => {
        const {FirstName, MiddleName, LastName, email, PhoneNumber, Password,Role} = req.body;
        const  user = await createUserSevice({
            FirstName,
            MiddleName,
            LastName,
            email,
            PhoneNumber,
            Password,
            Role
        })

        res.status(201).json({
            status: 'ok',
            message: 'User created successfully',
            data: user
        })
    }
);


export { createUser };