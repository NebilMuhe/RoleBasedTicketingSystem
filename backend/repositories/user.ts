import { UserModel } from "../models/model";
import type { User } from "../services/user";


const createUserRepo = async (user: User) => {
    const createdUser =await UserModel.create({
        FirstName: user.FirstName,
        MiddleName: user.MiddleName,
        LastName: user.LastName,
        email: user.email,
        PhoneNumber: user.PhoneNumber,
        Password: user.Password,
        Role: user.Role
    });

    return createdUser;
}

export { createUserRepo };