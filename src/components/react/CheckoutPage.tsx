import { createContext, useCallback, useState } from "react";
import CartTable from "src/components/react/composables/CartTable";
import type { ProductInterface } from "src/models/ProductInterface";

const totalContext = createContext({});
export default function CheckoutPage({data} : {data: ProductInterface[]}) {
    const [total, setTotal] = useState(0);
    const getTotal = (total: number) => useCallback(() => {
        setTotal(total);
    }, [])
    const contextValue = {
        total: total,
        getTotal: getTotal

    }
    return (
        <totalContext.Provider value={contextValue}>
            <div className="col-span-8 bg-base-200/80 rounded border backdrop-blur-sm">
                <h2 className="font-bold text-xl text-center py-4 bg-accent text-gray-50">Your Cart</h2>
                <CartTable data={data}  />
            </div>
            <div className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded border col-span-4 p-6">{total}</div>
        </totalContext.Provider>
    )
}