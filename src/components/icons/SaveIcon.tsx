    import { useMemo } from "react";
    import css from "./SaveIcon.module.css";

    type SaveStatus = "idle" | "saving" | "saved";

    type SaveIconProps = {
    dirty: boolean;
    saveStatus: SaveStatus;
    /** fired when the one-shot "saved" fade-out finishes */
    onSavedAnimationEnd?: () => void;
    };

    export const SaveIcon = ({ dirty, saveStatus, onSavedAnimationEnd }: SaveIconProps) => {
        const state = useMemo(() => {
            if (saveStatus === "saving") return "saving";
            if (saveStatus === "saved") return "saved";
            return dirty ? "unsaved" : "saved";
        }, [dirty, saveStatus]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label={state}
            role="img"
            className={css.saveIcon}
            data-state={state}
            onAnimationEnd={() => {
                if (state === "saved") onSavedAnimationEnd?.();
            }}
        >
            <title>{state}</title>
        <g id="floppy">
            <path d="M27.52 14.1a2.2 2.2 0 0 1 1.54 0.66l4.18 4.18a2.2 2.2 0 0 1 0.66 1.54V31.7a2.2 2.2 0 0 1 -2.2 2.2H16.3a2.2 2.2 0 0 1 -2.2 -2.2V16.3a2.2 2.2 0 0 1 2.2 -2.2z" />
            <path d="M29.5 33.9v-7.7a1.1 1.1 0 0 0 -1.1 -1.1H19.6a1.1 1.1 0 0 0 -1.1 1.1v7.7" />
            <path d="M18.5 14.1v4.4a1.1 1.1 0 0 0 1.1 1.1h7.7" />
        </g>

        {state === "unsaved" && (
            <g id="asterisk" className={css.badge} strokeWidth="2">
                {/* asterisk: three strokes crossing at (40,14), radius 5.95 (7 * 0.85) */}
                <path d="M40 8.05v11.9" />
                <path d="M34.85 11.03l10.3 5.95" />
                <path d="M34.85 16.98l10.3 -5.95" />
            </g>
            )}

        {state === "saved" && (
            <path
                className={css.badge}
                d="M35 14l3.5 3.5L45 9"
                strokeWidth="2"
            />
        )}

        {state === "saving" && (
            <circle
                cx="24" cy="24" r="20"
                stroke="#00a2c7"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className={css.circle}
            />
        )}
        </svg>
    );
    };