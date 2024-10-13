import express from 'express' 
import { get, identity, merge } from 'lodash';

import { getUserBySessonToken } from '../db/users';

export const isAuthenticated = async ( req: any, res: any, next: any) => {
    try {
        const sessionToken = req.cookies['AYUSH-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessonToken(sessionToken);

        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}