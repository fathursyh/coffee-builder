
type ProductProps = {
    id_item: string,
    title: string,
    stock: number,
    description: string,
}
export default function ProductCard({id_item, title, stock, description} : ProductProps) {
    return (
        <div className="card min-h-40 w-96 bg-base-100 card-xs shadow-sm p-2">
            <div className="card-body">
                <p>{`${id_item}`}</p>
                <a href={`/products/detail/${id_item}`} className="card-title">{title}</a>
                <p className="line-clamp-3">{description}</p>
                <div className="justify-end card-actions">
                    <button className="btn" disabled={stock === 0 && true} onClick={() =>{console.log(id_item)}}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}