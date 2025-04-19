import { ActionError, defineAction } from "astro:actions";
import ProductModel from "../database/productModel";
import { z } from "astro:content";

const Product = new ProductModel();
export const product = {
    getAllProducts: defineAction({
        input: z.object({ page: z.string() }),
        handler: async (input) => {
            const offset = parseInt(input.page);
            return await Product.coffee
                .find()
                .skip(offset === 1 ? 0 : (offset - 1) * 12)
                .limit(12);
        },
    }),
    getPageCount: defineAction({
        handler: async () => {
            const count = await Product.coffee.find().estimatedDocumentCount();
            return Math.ceil(count / 12);
        },
    }),
    findProducts: defineAction({
        input: z.object({
            search: z.string(),
        }),
        handler: async(input) => {
                const data = await Product.coffee.aggregate([
                    {
                        $search: {
                            index: 'text',
                            text: {
                                query: input.search,
                                path: "title",
                                matchCriteria: "any"
                            }
                        },
                    },
                    {
                        $limit: 10,
                    },
                ]);
                const formattedData = data.map(item => ({
                    ...item,
                    _id: item._id.toString()
                }));
                return formattedData; 
            
        },
    }),
    addProduct: defineAction({
        input: z.object({
            title: z.string(),
            stock: z.number(),
            description: z.string(),
            price: z.number()
        }),
        handler: async (input) => {
            const { errors } = await Product.coffee.create(input);
            if (errors) {
                throw new ActionError({ code: "BAD_REQUEST" });
            }
            return input;
        },
    }),
    addBulkProduct: defineAction({
        input: z.array(
            z.object({
                title: z.string(),
                stock: z.number(),
                description: z.string(),
                price: z.number()
            })
        ),
        handler: async (input) => {
            await Product.coffee.insertMany(input);
            return input;
        },
    }),
};
