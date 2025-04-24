export interface PaymentInterface {
    transaction_details: {
        order_id: string,
        gross_amount: number
    },
    credit_card?: {
        secure: boolean
    },
    item_details: {
        id: string,
        price: number,
        quantity: number,
    }[],
    customer_details: {
        first_name: string,
        last_name: string,
        email: string,
        billing_address: {
            address: string
        }
    }
}