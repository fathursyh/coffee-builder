import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import TransactionModel from "src/database/transactionModel";

const Transaction = new TransactionModel();
export const transaction = {
    getAllUserTransaction: defineAction({
        handler: async(_, context) => {
            const user = await context.session?.get('user');
            const transaction = await Transaction.transaction.find({userId: user?._id});
            return transaction.map(item => ({_id: item._id.toString(), total: item.total!, createdAt: item.createdAt}))
        }
    }),
    createTransaction: defineAction({
        input: z.object({
            id: z.string(),
            total: z.number(),
        }),
        handler: async(input) => {
            const res = await Transaction.newTransaction(input.id, input.total);
            if (!res) throw new ActionError({code: 'BAD_REQUEST'});
            return res._id.toString();
        }
    }),
    removeTransaction: defineAction({
        handler: async(input) => {
            const res = await Transaction.removeTransaction(input);
            if (res === false) throw new ActionError({code: 'INTERNAL_SERVER_ERROR'});
        }
    }),
    successTransaction: defineAction({
        input: z.object({
            id: z.string()
        }),
        handler: async(input) => {
            const res = await Transaction.changeToSuccess(input.id);
            if (res === false) throw new ActionError({code: 'INTERNAL_SERVER_ERROR'});
        }
    }),
};