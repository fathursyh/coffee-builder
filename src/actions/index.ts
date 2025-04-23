import { defineAction } from "astro:actions"
import { product } from "./product"
import { user } from "./user"
import { cart } from "./cart";
import { transaction } from "./transaction";

export const server = {
    user,
    product,
    cart,
    transaction,
    clearAlert: defineAction({
        handler: (_, context) => {
            context.session?.set('alert', null)
        }
    })
}