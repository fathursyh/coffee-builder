import { useState } from "react";
import CartTable from "src/components/react/composables/CartTable";
import type { ProductInterface } from "src/models/ProductInterface";
import type UserInterface from "src/models/UserInterface";
import CheckoutInfo from "./composables/CheckoutInfo";

export default function CheckoutPage({ data, user }: { data: ProductInterface[], user: UserInterface }) {
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    return (
        <>
            {/* left section */}
            <div className="col-span-8 bg-base-200/80 rounded border backdrop-blur-sm">
                <h2 className="font-bold text-xl text-center py-4 bg-accent text-gray-50">Your Cart</h2>
                <CartTable data={data} setTotal={setTotal} total={total} />
            </div>
            {/* right section */}
            <div className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded md:col-span-4 p-12 w-screen md:w-auto flex flex-col gap-2">
                <div>
                    <label className="ps-1 text-xs" htmlFor="user-mail">Email</label>
                    <p id="user-mail" className="border p-3 rounded bg-gray-50 dark:bg-gray-800 text-sm" >{user.email}</p>
                </div>
                <div>
                    <label className="ps-1 text-xs" htmlFor="user-name">Full name</label>
                    <p id="user-name" className="border p-3 rounded bg-gray-50 dark:bg-gray-800 text-sm">{user.fullName}</p>
                </div>
                <div className="mb-4">
                    <label className="ps-1 text-xs" htmlFor="user-name">Address</label>
                    <textarea className="textarea rounded bg-gray-50 dark:bg-gray-800 dark:textarea-warning textarea-accent max-h-32" placeholder="Your address here" value={address} onChange={(e) => {setAddress(e.target.value)}} />
                </div>
                <CheckoutInfo title="Subtotal :">Rp. {total.toLocaleString('id-ID')}</CheckoutInfo>
                <CheckoutInfo title="Tax 4%">Rp. {(total * 0.04).toLocaleString('id-ID')}</CheckoutInfo>
                <CheckoutInfo title="Total :" isBold={true} >Rp. {(total + (total * 0.04)).toLocaleString('id-ID')}</CheckoutInfo>
                <button className="btn btn-lg py-8 btn-secondary dark:btn-primary mt-auto">Checkout</button>
            </div>
        </>
    )
}