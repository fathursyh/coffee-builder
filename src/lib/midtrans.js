import midtransClient from 'midtrans-client';

class MidtransPayment {
    snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : import.meta.env.MIDTRANS_SERVER
    });
    async createTransaction(data) {
        const transaction = await this.snap.createTransaction(data)
            .then((transaction)=> transaction.token);
        return transaction;
    }
}

export const midtrans = new MidtransPayment();