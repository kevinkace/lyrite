import clsx from "clsx";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import css from "./Layout.module.css";

export default function Layout({ children, page }: { children: React.ReactNode, page?: string }) {
    return (
        <div className={clsx(css.layout)} data-page={page}>
            <Header />
            <main className={css.main}>
                {children}
            </main>

            <Footer />
        </div>
    );
}