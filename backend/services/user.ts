import { createUserRepo } from "../repositories/user";

export interface User {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    email: string;
    PhoneNumber: string;
    Password: string;
    Role: string;
}


const createUserSevice = async (user: User) => {
    const argonHash = await Bun.password.hash(user.Password, {
        algorithm: "argon2id",
        memoryCost: 4, 
        timeCost: 3, 
    });
    user.Password = argonHash;
    const createdUser = await createUserRepo(user);
    return createdUser;
}

export { createUserSevice };