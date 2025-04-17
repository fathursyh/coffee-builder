import { actions } from "astro:actions";
import { useCallback, useState, type KeyboardEvent } from "react"

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const searchProduct = useCallback(async(e : KeyboardEvent) => {
        if (e.key === 'Enter') {
            const {data} = await actions.product.findProducts({search: search});
            console.log(data);
        }
    }, [search]);
    return (
        <input type="text" value={search} onChange={(e) => {
            setSearch(e.target.value)
        }} placeholder="Search" className="input input-bordered w-24 md:w-auto" onKeyDown={searchProduct} />
    )
}