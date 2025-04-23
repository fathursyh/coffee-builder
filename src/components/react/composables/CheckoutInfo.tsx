import type { ReactNode } from "react";

export default function CheckoutInfo(props : {title: string, isBold?: boolean, children?: ReactNode}) {
    return (
        <article className={`flex justify-between ${props.isBold && 'font-semibold'}`}>
            <span>{props.title}</span>
            <span>{props.children}</span>
        </article>
    )
};

