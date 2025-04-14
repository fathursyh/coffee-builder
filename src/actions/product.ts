import { ActionError, defineAction } from "astro:actions";
import ProductModel from "../database/productModel";
import { z } from "astro:content";

const Product = new ProductModel();
export const product = {
    getAllProducts: defineAction({
        handler: async() => {
            return (await Product.coffee.find().limit(20));
        }
    }),
    addProduct: defineAction({
        input: z.object({
            title: z.string(),
            stock: z.number(),
            description: z.string(),
        }),
        handler: async(input) => {
            const {errors} = await Product.coffee.create(input);
            if(errors) {
                throw new ActionError({code: 'BAD_REQUEST'});
            }
            return input;
        }
    }),
    addBulkProduct: defineAction({
        input: z.array(z.object({
            title: z.string(),
            stock: z.number(),
            description: z.string(),
        })),
        handler: async(input) => {
            await Product.coffee.insertMany(input);
            return input;
        }
    }),
};