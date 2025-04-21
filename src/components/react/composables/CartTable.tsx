import { useCallback,  useState } from "react"
import type { ProductInterface } from "src/models/ProductInterface";

function TableRow({data: { title, price, stock }, index} : {data: ProductInterface, index: number}) {
    const [qty, setQty] = useState(1);
    const increaseQty = useCallback(() => {
        setQty((value) => value = value + 1);
    }, []);
    const decreaseQty = useCallback(() => {
        setQty((value) => value = value - 1);
    }, []);

    return (
        <tr>
        <th>{index + 1}</th>
        <td>{title}</td>
        <td className="flex gap-2 w-20 justify-center">
            <button className={`btn btn-circle btn-ghost btn-xs ${ qty < 2 && 'invisible' }`} onClick={() => {
                if (qty < 2) {return}
                decreaseQty();
            }}>
                &#11164;
            </button>
            <span className="bg-gray-50 dark:bg-gray-800 rounded-sm px-6">{qty}</span>
            <button className={`btn btn-circle btn-ghost btn-xs ${ qty === stock && 'invisible' }`} onClick={() => {
                if (qty < stock) {
                    increaseQty();
                }
            }}>
                &#11166;
            </button>
        </td>
        <td>{price.toLocaleString('id-ID')}</td>
        <td>{(qty * price).toLocaleString('id-ID')}</td>
    </tr>
    )
}

export default function CartTable(props : {data: ProductInterface[]}) {
    return (
        <div className="overflow-x-auto p-6">
            <table className="table table-md table-fixed">
                <thead className="table-header-group">
                    <tr>
                        <th className="w-[8%]">No</th>
                        <th className="w-[45%]">Product Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((row, index) => (
                            <TableRow key={row._id.toString()} data={row} index={index} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}