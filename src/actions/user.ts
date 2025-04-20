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
            fullName: z.string().trim().min(1),
            email: z.string().email().min(8),
            password: z.string().min(8),
            confirmPassword: z.string().min(8)
        }).refine((input)=> {
            if (input.password === input.confirmPassword) return true;
        }, {
            message: "Password and confirm password is not match.",
            path: ['confirmPassword'],
        }),
        handler: async(input, context) => {
            const hashed = await bcrypt.hash(input.password, saltRounds);
            try {
                const user = await User.signUp(input.email, hashed, input.fullName);
                const userData = {_id: user._id.toString(), email: user.email, fullName: user.fullName, friends: []}
                await context.session?.regenerate();
                context.session?.set('user', userData);
            } catch(e : any) {
                if (e.code === 11000) {
                    throw new ActionError({code: 'CONFLICT', message: 'Email already exist'});
                }
                console.log(e);
                throw new ActionError({code: 'INTERNAL_SERVER_ERROR', message: e.message});
            }
            return true;
        }
    }),
    
}
