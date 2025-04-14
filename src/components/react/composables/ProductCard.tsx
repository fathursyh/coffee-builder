import type { Schema } from "mongoose"
import { useEffect } from "react"

// type ProductProps = {
//     _id: Schema.Types.ObjectId,
//     title: String,
//     stock: Number,
//     description: String,
//     __v: Number,
//     createdAt: Date,
//     updatedAt: Date,
// }
export default function ProductCard(props : any) {
    useEffect(() => {
        console.log(props.props['_doc']);
    }, [])
    return (
        <div className="card w-96 bg-base-100 card-xs shadow-sm">
            <div className="card-body">
                {/* <h2 className="card-title">{props.title}</h2> */}
                {/* <p>{props.description}</p> */}
                <div className="justify-end card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}