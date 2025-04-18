import { actions } from "astro:actions";
import { useCallback, useState, type KeyboardEvent } from "react"
import type { ProductInterface } from "src/models/ProductInterface";

function ResultList({result} : {result: Array<ProductInterface>}) {
    if (result.length > 0) {
        return (
            <ul className="z-30 absolute -translate-y-0.5 w-full h-fit max-h-52 overflow-y-auto bg-base-100 border border-neutral/50 rounded-b list">
                {
                    result.map(item=>(
                        <li className="list-row hover:bg-base-200/50 rounded-none" key={item._id}>
                            <a href={`/products/detail/${item._id}`}>{item.title}</a>
                        </li>
                    ))
                }
            </ul>
        )
    } 
}

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState<Array<ProductInterface>>([]);
    const searchProduct = useCallback(async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (search !== '') {
                const { data } = await actions.product.findProducts({ search: search });
                setResult(data!);
            } else { setResult([]) }
        }
    }, [search]);
    return (
        <div className="relative">
            <input type="text" value={search} onChange={(e) => {
                setSearch(e.target.value)
            }} placeholder="Search" className="input input-bordered w-24 md:w-auto" onKeyDown={searchProduct} />
            <ResultList result={result} />
        </div>
    )
}