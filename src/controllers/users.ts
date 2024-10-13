import express from 'express';
 
import { getUsers } from '../db/users';

export const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}