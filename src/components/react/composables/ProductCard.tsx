import type { Types } from "mongoose"

type ProductProps = {
    id: Types.ObjectId,
    title: string,
    stock: number,
    description: string,
}
export default function ProductCard({id, title, stock, description} : ProductProps) {
    return (
        <div className="card min-h-40 w-96 bg-base-100 card-xs shadow-sm p-2">
            <div className="card-body">
                <a href={`/products/detail/${id}`} className="card-title">{title}</a>
                <p className="line-clamp-3">{description}</p>
                <div className="justify-end card-actions">
                    <button className="btn" disabled={stock === 0 && true}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}