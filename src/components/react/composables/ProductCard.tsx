import { actions } from "astro:actions";
import { Utility } from "src/script/utility"
type ProductProps = {
    id_item: string,
    title: string,
    stock: number,
    description: string,
    price: number
}
export default function ProductCard({id_item, title, stock, description, price} : ProductProps) {
    const buyItem = async() => {
        if (stock < 0) {
            return;
        }
        const {data} = await actions.cart.addItem({id: id_item});
        if (!data) {
            window.location.href = '/login';
        }
    }
    return (
        <div className="card min-h-40 w-96 bg-base-100 card-xs shadow-sm p-2">
            <div className="card-body">
                <a href={`/products/detail/${id_item}`} className="card-title">{title}</a>
                <p className="line-clamp-3">{description}</p>
                <div className="justify-end card-actions">
                    <p className="text-lg font-medium">{Utility.currency(price)}</p>
                    <button className="btn hover:scale-105 duration-200 transition-transform" disabled={stock === 0 && true} onClick={buyItem}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}