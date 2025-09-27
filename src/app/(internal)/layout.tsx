import clsx from "clsx";

import Header from "@/components/layout/Header";
import css from "../layout.module.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={clsx(css.layout)} >
            <Header />
            <main className={css.main}>
                {children}
            </main>
        </div>
    );
}