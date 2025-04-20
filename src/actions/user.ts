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
            fullName: z.string({message: 'Full name is required.'}),
            email: z.string({message: 'Email is required.'}).email(),
            password: z.string({message: 'Password is required.'}).min(8, 'Password must be at least 8 characters'),
            confirmPassword: z.string({message: 'Confirm password is required.'}).min(8, 'Confirm password must be at least 8 characters')
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
                const userData = {_id: user._id.toString(), email: user.email, fullName: user.fullName, cart: []};
                await context.session?.regenerate();
                context.session?.set('user', userData);
                context.session?.set('alert', {status: 'success', text: 'Registration successfull!'});

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
    logoutUser: defineAction({
        handler: (_, context) => {
            context.session?.destroy();
            context.session?.set('alert', {status: 'no', text: 'Logout successful!'});
        }
    }),
    
}
