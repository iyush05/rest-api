import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const getUsers = async () => {
    return await prisma.users.findMany();
}

export const getUserByEmail = async (email: string) => {
    return await prisma.users.findUnique({ 
        where: {
            email,
        },
        include: {
            authentication: true,
        },
    });
}

export const getUserBySessonToken = async (sessionToken: string) => {
    return await prisma.authentication.findUnique({
        where: {
            sessionToken,
        },
        include: {
            user: true,
        },
    })
}

export const getUserById = async (id: string) => {
    return await prisma.users.findUnique({
        where: {
            id,
        },
    })
}

export const createUser = async ( values: { username: string, email: string, password: string, salt: string }) => {
    return await prisma.users.create({
        data: {
            username: values.username,
            email: values.email,
            authentication: {
                create: {
                    password: values.password,
                    salt: values.salt,
                    sessionToken: null,
                },
            },
        },
    });
}

export const deleteUser = async (id: string) => {
    return prisma.users.delete({
        where: {
            id,
        },
    })
}

export const updateUser = async (id: string, usernaem: string) => {
    return prisma.users.update({
        where: {
            id,
        },
        data: {
            username: usernaem,
        },
    })
}
