import { actions } from "astro:actions";
import { useCallback, useState, type FormEvent } from "react";
import type { ProductInterface } from "src/models/ProductInterface";

function ResultList({ result }: { result: Array<ProductInterface> }) {
    if (result.length > 0) {
        return (
            <ul className="z-30 absolute -translate-y-0.5 w-full h-fit max-h-52 overflow-y-auto bg-base-100 border border-neutral/50 rounded-b list">
                {result.map((item) => (
                    <li className="list-row hover:bg-base-200/50 rounded-none" key={item._id}>
                        <a href={`/products/detail/${item._id}`}>{item.title}</a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState<Array<ProductInterface>>([]);
    const searchProduct = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (search !== "") {
                const { data } = await actions.product.findProducts({ search: search });
                setResult(data!);
            } else {
                setResult([]);
            }
        },
        [search]
    );
    return (
        <>
            <form className="relative" onSubmit={searchProduct}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder="Search products"
                    className="input input-bordered w-24 md:w-52 xl:w-80"
                    onKeyDown={(e) => {
                        if(e.key === "Escape") {
                            setSearch('');
                            setResult([]);
                        }
                    }}
                />
                <button type="submit" className="btn btn-square bg-accent dark:bg-secondary rounded-l-none absolute right-0">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
                <ResultList result={result} />
            </form>
        </>
    );
}
