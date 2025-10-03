import clsx from "clsx";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import css from "./Layout.module.css";

export default function Layout({ children, className, bg }: { children: React.ReactNode, className?: string, bg?: "mesh" | "none" }) {
    return (
        <div className={clsx(css.layout, className, {
            [css.mesh]: bg === "mesh",
            [css.none]: bg === "none"
        })}>
            <Header />
            <main className={css.main}>
                {children}
            </main>

            <Footer />
        </div>
    );
}