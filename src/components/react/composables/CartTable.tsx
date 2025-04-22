import { actions } from "astro:actions";
import { useCallback, useEffect, useState } from "react";
import type { ProductInterface } from "src/models/ProductInterface";

function TableRow({ data: { _id, title, price, stock }, index, getTotalItem }: { data: ProductInterface; index: number; getTotalItem: Function }) {
    const [qty, setQty] = useState(1);
    const increaseQty = useCallback(() => {
        getTotalItem(price * qty);
        setQty((value) => (value = value + 1));
    }, []);
    const decreaseQty = useCallback(() => {
        getTotalItem(price * -qty);
        setQty((value) => (value = value - 1));
    }, []);

    const removeItem = useCallback(async(id: string) => {
        const confirmation = confirm('Remove this product from your cart?');
        if (!confirmation) return;
        const {error} = await actions.cart.removeItem(id);
        if (error) console.log(error);
        window.location.reload();
    }, []);

    useEffect(() => {
        getTotalItem(price * qty);
    }, []);

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{title}</td>
            <td className="flex gap-2 w-20 justify-center">
                <button
                    className={`btn btn-circle btn-ghost btn-xs ${qty < 2 && "invisible"}`}
                    onClick={() => {
                        if (qty < 2) {
                            return;
                        }
                        decreaseQty();
                    }}
                >
                    &#11164;
                </button>
                <button className="bg-gray-50 dark:bg-gray-800 rounded-sm btn btn-ghost btn-xs w-8" onClick={() => {
                    removeItem(_id.toString());
                }}>{qty}</button>
                <button
                    className={`btn btn-circle btn-ghost btn-xs ${qty === stock && "invisible"}`}
                    onClick={() => {
                        if (qty < stock) {
                            increaseQty();
                        }
                    }}
                >
                    &#11166;
                </button>
            </td>
            <td>{price.toLocaleString("id-ID")}</td>
            <td>{(qty * price).toLocaleString("id-ID")}</td>
        </tr>
    );
}

export default function CartTable(props: { data: ProductInterface[]; setTotal: Function, total: number }) {
    const getTotalItem = (total: number) => {
        props.setTotal((value: number) => value + total);
    };
    if (props.data.length < 1) {
        return (
            <div className="w-full min-h-[38.2rem] grid place-items-center">
                <h3>Cart is empty.</h3>
            </div>
        )
    }
    return (
        <div className="overflow-x-auto md:p-6 p-2">
            <table className="table md:table-md table-sm table-fixed">
                <thead className="table-header-group">
                    <tr>
                        <th className="w-[8%]">No</th>
                        <th className="md:w-[45%] w-[35%]">Product Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row, index) => (
                        <TableRow key={row._id.toString()} data={row} index={index} getTotalItem={getTotalItem} />
                    ))}
                    <tr className="font-semibold">
                        <th></th>
                        <td></td>
                        <td></td>
                        <td>Total :</td>
                        <td>{(props.total).toLocaleString('id-ID')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
