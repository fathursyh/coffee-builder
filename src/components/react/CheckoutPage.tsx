import { useState } from "react";
import CartTable from "src/components/react/composables/CartTable";
import type { ProductInterface } from "src/models/ProductInterface";

export default function CheckoutPage({data} : {data: ProductInterface[]}) {
    const [total, setTotal] = useState(0);
    return (
        <>
            <div className="col-span-8 bg-base-200/80 rounded border backdrop-blur-sm">
                <h2 className="font-bold text-xl text-center py-4 bg-accent text-gray-50">Your Cart</h2>
                <CartTable data={data} setTotal={setTotal} total={total} />
            </div>
            <div className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded border md:col-span-4 p-6 w-screen">{total}</div>
        </>
    )
}