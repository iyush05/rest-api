//auth helpers which help to  encrypt the passs or generate random token
import crypto from 'crypto'
require('dotenv').config();

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication= (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex');
}