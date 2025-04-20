import { ActionError, defineAction } from "astro:actions";
import UserModel from "../database/userModel";
import { z } from "astro/zod";
import bcrypt from 'bcrypt';

const User = new UserModel();

const saltRounds = 10;


export const user = {
    getAllUser: defineAction({
        handler: async(_, context) => {
            if (context.request.method !== 'GET') {
                throw new ActionError({code: 'FORBIDDEN', message: 'Request forbidden.'});
            }
            return User.getAllUser();
        }
    }),
    loginUser: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email().min(2),
            password: z.string().min(8)
        }),
        handler: async(input, context) => {
            const hashed = await bcrypt.hash(input.password, saltRounds);
            const user = await User.signIn(input.email, hashed);
            // todo write in session
        }
    }),
    registerUser: defineAction({
        accept: 'form',
        input: z.object({
            fullName: z.string().min(1),
            email: z.string().email().min(2),
            password: z.string().min(8),
        }),
        handler: async(input, context) => {
            const hashed = await bcrypt.hash(input.password, saltRounds);
            const user = await User.signUp(input.email, input.password, input.password);
            // todo write in session
        }
    }),
    
}
