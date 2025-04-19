import { Utility } from "src/script/utility"
type ProductProps = {
    id_item: string,
    title: string,
    stock: number,
    description: string,
    price: number
}
export default function ProductCard({id_item, title, stock, description, price} : ProductProps) {
    return (
        <div className="card min-h-40 w-96 bg-base-100 card-xs shadow-sm p-2 hover:scale-110 transition-transform duration-200">
            <div className="card-body">
                <a href={`/products/detail/${id_item}`} className="card-title">{title}</a>
                <p className="line-clamp-3">{description}</p>
                <div className="justify-end card-actions">
                    <p className="text-lg font-medium">{Utility.currency(price)}</p>
                    <button className="btn" disabled={stock === 0 && true} onClick={() =>{console.log(id_item)}}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}