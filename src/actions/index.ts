import { defineAction } from "astro:actions"
import { product } from "./product"
import { user } from "./user"
import { cart } from "./cart";

export const server = {
    user,
    product,
    cart,
    clearAlert: defineAction({
        handler: (_, context) => {
            context.session?.set('alert', null)
        }
    })
}