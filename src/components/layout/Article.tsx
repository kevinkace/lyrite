import css from "./Article.module.css";

export default function Article({ children }: { children: React.ReactNode }) {
    return <article className={css.article}>
        {children}
    </article>
}