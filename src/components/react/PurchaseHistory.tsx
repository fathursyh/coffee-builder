import { actions } from "astro:actions";
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";

const HistoryList = () => {
    const [history, setHistory] = useState<{_id: string, total: number, createdAt: Date}[]>([]);
    const getHistory = async() => {
        const { data } = await actions.transaction.getAllUserTransaction();
        setHistory([...data!]);
    }
    useEffect(() => {
        getHistory();
    }, []);
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
                        {
                            history.map(item => (
                            <li className="flex justify-between px-8 mb-2" key={item._id}>
                                <span>{item.createdAt.toLocaleDateString('id-ID')}</span>
                                <span>Rp. {item.total.toLocaleString('id-ID')}</span>
                            </li>

                            ))
                        }
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