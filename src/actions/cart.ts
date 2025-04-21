import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const cart = {
    getCartData: defineAction({
        handler: async(_, context) => {
            return await context.session?.get('cart');
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
            const cart = await context.session?.get('cart');
            cart.push(input.id);
            context.session?.set('cart', cart);
            return true;
        }
    }),
};