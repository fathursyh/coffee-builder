import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import TransactionModel from "src/database/transactionModel";

const Transaction = new TransactionModel();
export const transaction = {
    createTransaction: defineAction({
        input: z.object({
            id: z.string(),
            total: z.number(),
        }),
        handler: async(input) => {
            const res = await Transaction.newTransaction(input);
            if (!res) throw new ActionError({code: 'BAD_REQUEST'});
            return res;
        }
    }),
};