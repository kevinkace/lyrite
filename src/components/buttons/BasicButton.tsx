import css from "./Button.module.css";

export const BasicButton = ({children, ...props } :{ children: React.ReactNode; onClick: () => void; }) => {
    return <button className={css.basicButton} {...props}>{children}</button>;
}