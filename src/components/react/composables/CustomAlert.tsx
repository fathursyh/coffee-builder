import { actions } from "astro:actions";
import { useEffect, useState } from "react"

type AlertProps = {
    status: string,
    text: string
}
export default function CustomAlert({status, text}: AlertProps) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            actions.clearAlert();
        }, 3000);
    }, [])
    return (
        <div role="alert" className={`alert ${status === 'success' ? 'alert-success' : 'alert-error'} alert-soft fixed z-50 ${visible ? 'top-0' : '-top-20'} w-full rounded-none justify-center py-6 transition-all duration-300`}>
            <span>{text}</span>
        </div>
    )
}