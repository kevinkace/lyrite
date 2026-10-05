import css from "./TableError.module.css";

export default function TableError({ children }) {
    return <p className={css.error}>{children}</p>;
}