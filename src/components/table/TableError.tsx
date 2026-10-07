import type { ReactNode } from "react";

import css from "./TableError.module.css";

export default function TableError({ children }: { children: ReactNode }) {
    return <p className={css.error}>{children}</p>;
}