import { useRef } from "react"
import { createPortal } from "react-dom";

const HistoryList = () => {
    return (
        <>
            <div className="modal-box">
                <h5 className="text-center font-semibold text-lg mb-2">Purchase History</h5>
                <div className="container border rounded-lg p-4 h-80 overflow-y-auto">
                    <div className="flex justify-between px-8 font-semibold border-b pb-2 mb-2">
                        <span>Date</span>
                        <span>Transaction</span>
                    </div>
                    <ul className="divide-y space-y-2">
                        <li className="flex justify-between px-8 mb-2">
                            <span>20/12/25</span>
                            <span>Rp. 502.000</span>
                        </li>
                    </ul>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button aria-label="model close">close</button>
            </form>
        </>
    )
}
export default function PurchaseHistory() {
    const modal = useRef<HTMLDialogElement>(null);
    return (
        <>
            <li>
                <button onClick={() => modal.current?.show()}>History</button>
            </li>
            {
                createPortal(
                    <dialog className="modal" ref={modal}>
                        <HistoryList />
                    </dialog>,
                    document.body

                )
            }
        </>
    )
}