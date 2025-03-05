import { BadRequestError, InternalServerError, NotFoundError } from "../error/error";
import { createUserRepo, userExists } from "../repositories/user";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export interface RegisterUser {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, process.env.PRIVATE_KEY_PATH!), 'utf8');
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, process.env.PUBLIC_KEY_PATH!), 'utf8');



const createUserSevice = async (user: RegisterUser) => {
    const argonHash = await Bun.password.hash(user.password, {
        algorithm: "argon2id",
        memoryCost: 4, 
        timeCost: 3, 
    });
    user.password = argonHash;
    const createdUser = await createUserRepo(user);
    return createdUser;
}


const loginUserSevice = async (user: LoginUser) => {
    const userData = await userExists(user.email);
    if (!userData) {
        throw new NotFoundError('User not found');
    }
   

    const isPasswordCorrect = await Bun.password.verify(user.password, userData.Password,"argon2id");
    if (!isPasswordCorrect) {
        throw new BadRequestError('Invalid password');
    }
 
    try {
        const expiresIn = 60 * 15; // 15 minutes
        const access_token = generateAccessToken(userData._id.toString(), expiresIn);
        const refresh_token = generateRefreshToken(25);

        const tokenResponse: TokenResponse = {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expiresIn
        }
        return tokenResponse;
    } catch (error: any) {
        console.error('JWT Token Generation Error:', error.stack || error);
        throw new InternalServerError('Something Went Wrong. Please try again.');
    }
}


const generateAccessToken = (userId: string,expiresIn: number) => {
    const token = jwt.sign({userId},PRIVATE_KEY!, {algorithm: 'RS256',expiresIn: expiresIn});
    return token;
}

const generateRefreshToken = (length: number) => {
    return generateRandomString(length);
}

const generateRandomString = (length: number) => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += letters[Math.floor(Math.random() * letters.length)];   
    }

    return result;
}


export { createUserSevice,loginUserSevice };