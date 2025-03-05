import { UserModel } from "../models/model";
import type { RegisterUser } from "../services/user";


const createUserRepo = async (user: RegisterUser) => {
    const createdUser =await UserModel.create({
        FirstName: user.first_name,
        MiddleName: user.middle_name,
        LastName: user.last_name,
        Email: user.email,
        PhoneNumber: user.phone_number,
        Password: user.password,
        Role: user.role
    });

    return createdUser;
}

const userExists = async (email: string,phone: string) => {
    const user = await UserModel.findOne({
        $or: [{ email: email }, { PhoneNumber: phone }]
    });
    
    if (user) {
        return user
    }
    return null;
}

export { createUserRepo,userExists };