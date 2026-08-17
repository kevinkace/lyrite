import css from "./Article.module.css";

export default function Article({ children }) {
    return <article className={css.article}>
        {children}
    </article>
}