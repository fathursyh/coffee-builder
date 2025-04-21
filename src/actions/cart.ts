import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { Types } from "mongoose";
import UserModel from "src/database/userModel";

const User = new UserModel();
export const cart = {
    getCartData: defineAction({
        handler: async(_, context) => {
            const user = await context.session?.get('user');
            return user.cart;
        }
    }),
    addItem: defineAction({
        input: z.object({
            id: z.string()
        }),
        handler: async(input, context) => {
            const user = await context.session?.get('user');
            if(!user) {
                context.session?.set('alert', {status: 'no', text: 'You must be logged in to make a purchase.'});
                context.session?.set('last-page', context.request.headers.get('referer'));
                return false;
            }
            const isExist = user.cart.includes(input.id);
            if (isExist) {
                context.session?.set('alert', {status: 'no', text: 'Item is already inside your cart.'});
                return true;
            }
            user.cart.push(input.id);
            context.session?.set('user', user);
            await User.user.findByIdAndUpdate(user._id, {$push: {cart: new Types.ObjectId(input.id)}});
            context.session?.set('alert', {status: 'success', text: 'Item has been added to your cart!'});
            return true;
        }
    }),
};