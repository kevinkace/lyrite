import clsx from "clsx";

import css from "./Hr.module.css";

export default function Hr({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <div className={clsx(css.hr, className)}>
            {children}
        </div>
    );
}
