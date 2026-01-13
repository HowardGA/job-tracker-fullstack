import prisma from "../config/prisma";
import { Role } from "@prisma/client";

export const UserData = async (userId: string, role: Role | undefined) => {
    return await prisma.user.findUnique({
        where: { id: userId},
        select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            cvUrl: true,
            jobs: (role === 'EMPLOYER'),
            applied: (role === 'CANDIDATE')
        }
    })
}