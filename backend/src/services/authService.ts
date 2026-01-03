import prisma from "../config/prisma";
import { Role } from "@prisma/client";
import { signToken } from "../utils/token";
import { compare } from "bcrypt";


export const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    role: Role
) => {
    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (userExists){
        throw new Error('The email is already used to register');
    }
    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        }
    });

    const userWithoutPassword = { 
        id: newUser.id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role
     };
    const token = signToken({userId: newUser.id, name: `${newUser.firstName} ${newUser.lastName}`, role: newUser.role});
    return {userWithoutPassword, token};
}

export const login = async (
    email: string,
    password: string
) => {
    const userExists = await prisma.user.findFirst({
        where: {
            email
        },
    });

    if(!userExists){
        throw new Error('Invalid Credentials');
    }

    const userWithoutPassword = {
        id: userExists.id,
        name: `${userExists.firstName} ${userExists.lastName}`,
        email: userExists.email,
        role: userExists.role
    }

    const isValid = await compare(password, userExists.password);
    if(!isValid) {
        throw new Error('Invalid Credentials');
    }
    const token = signToken({userId: userExists.id, name: `${userExists.firstName} ${userExists.lastName}`, role: userExists.role});
    return {userWithoutPassword, token}
}