import { UserModel } from "../models/model";
import type { RegisterUser } from "../services/user";


const createUserRepo = async (user: RegisterUser) => {
    const createdUser =await UserModel.create({
        FirstName: user.firstName,
        MiddleName: user.middleName,
        LastName: user.lastName,
        email: user.email,
        PhoneNumber: user.phoneNumber,
        Password: user.password,
        Role: user.role
    });

    return createdUser;
}

const userExists = async (email: string) => {
    const user = await UserModel.findOne({email});
    if (user) {
        return user
    }
    return null;
}

export { createUserRepo,userExists };