import { actions } from "astro:actions";

export default function BuyButton(props: {stock: number, id_item: string}) {
     const buyItem = async() => {
            if (props.stock < 0) {
                return;
            }
            console.log(props.id_item);
            const {data} = await actions.cart.addItem({id: props.id_item});
            if (!data) {
                window.location.href = '/login';
            }
            else {
                window.location.reload();
            }
        }
    return (
        <button id="buy-button" className="btn btn-primary py-6" onClick={buyItem}>Add to cart</button>
    )
}