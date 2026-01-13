import prisma from "../config/prisma";

export const saveCVPath = async (url: string, userId: string) => {
    await prisma.user.update({
        where: { id:userId },
        data: { cvUrl: url }
    });
};

export const getCVPath = async (userId: string) => {
    const path = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            cvUrl: true
        }
    });

    return path?.cvUrl
}