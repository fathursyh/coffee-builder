import { actions } from "astro:actions";
import { useEffect, useState } from "react";

function Indicator() {
    const [cart, setCart] = useState(0);
    useEffect(() => {
        actions.cart.getCartData({}).then(res=>{
            setCart(res.data.length);   
        });
    }, []);
    return (
        <>
            <span className="badge badge-success w-3 absolute -top-2 -left-2 rounded-full p-3">{cart}</span>
        </>
    );
}

export default function FloatingCart() {
    return (
        <a href="/cart" className="btn btn-xl btn-circle btn-accent fixed right-12 bottom-8 hover:scale-110 transition-all duration-300">
            <Indicator />
            <svg className="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path
                    fillRule="evenodd"
                    d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    );
}
