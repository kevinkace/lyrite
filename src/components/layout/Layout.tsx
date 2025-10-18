import clsx from "clsx";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import css from "./Layout.module.css";

export default function Layout({
    children,
    className,
    header = true,
    bg,
    justifyContent
}: {
    children: React.ReactNode,
    className?: string,
    header?: boolean,
    bg?: "mesh" | "none",
    justifyContent?: "center"
}) {
    return (
        <div
            className={
                clsx(
                    css.layout,
                    className,
                    {
                        [css.mesh]: bg === "mesh",
                        [css.none]: bg === "none"
                    }
                )
            }
        >
            {header && <Header />}
            <main
                className={
                    clsx(
                        css.main,
                        {
                            [css.center]: justifyContent === "center"
                        }
                    )
                }
            >
                {children}
            </main>

            <Footer />
        </div>
    );
}