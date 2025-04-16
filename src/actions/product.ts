import { ActionError, defineAction } from "astro:actions";
import ProductModel from "../database/productModel";
import { z } from "astro:content";

const Product = new ProductModel();
export const product = {
    getAllProducts: defineAction({
        input: z.object({page: z.string()}),
        handler: async(input) => {
            const offset = parseInt(input.page);
            return await Product.coffee.find().skip(offset === 1 ? 0 : ((offset - 1) * 12)).limit(12);
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