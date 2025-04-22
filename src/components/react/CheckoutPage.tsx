import { useState } from "react";
import CartTable from "src/components/react/composables/CartTable";
import type { ProductInterface } from "src/models/ProductInterface";
import type UserInterface from "src/models/UserInterface";
import CheckoutInfo from "./composables/CheckoutInfo";

export default function CheckoutPage({data, user} : {data: ProductInterface[], user: UserInterface}) {
    const [total, setTotal] = useState(0);
    return (
        <>
        {/* left section */}
            <div className="col-span-8 bg-base-200/80 rounded border backdrop-blur-sm">
                <h2 className="font-bold text-xl text-center py-4 bg-accent text-gray-50">Your Cart</h2>
                <CartTable data={data} setTotal={setTotal} total={total} />
            </div>
        {/* right section */}
            <div className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded md:col-span-4 p-12 w-screen md:w-auto flex flex-col gap-2">
            <p className="border p-4 rounded">{user.email}</p>
            <p className="border p-4 rounded mb-auto">{user.fullName}</p>
            <CheckoutInfo title="Subtotal :">Rp. {total.toLocaleString('id-ID')}</CheckoutInfo>
            <CheckoutInfo title="Tax 10%">Rp. {(total * 0.1).toLocaleString('id-ID')}</CheckoutInfo>
            <CheckoutInfo title="Total :" isBold={true} >Rp. {(total + (total * 0.1)).toLocaleString('id-ID')}</CheckoutInfo>
            <button className="btn btn-lg py-8 btn-secondary dark:btn-primary mt-auto">Checkout</button>
            </div>
        </>
    )
}