import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if(!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user.id.toString())
        
        res.cookie('AYUSH-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});

        return res.status(200).json(user).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: any, res: any) => {
    try {
        const { email, password, username } = req.body;

        if(!email   ||    !password  ||  !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);
        const user = await createUser({
            email,
            username,
            password:hashedPassword,
            salt
        });
        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}