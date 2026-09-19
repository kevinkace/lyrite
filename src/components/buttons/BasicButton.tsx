import css from "./Button.module.css";

export const BasicButton = ({children, ...props }) => {
    return <button className={css.basicButton} {...props}>{children}</button>;
}