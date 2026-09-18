import css from "./SaveIcon.module.css";

export const SaveIcon = ({ dirty, saveStatus }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={css.saveIcon}
        >
            <g id="floppy">
                <path d="M27.52 14.1a2.2 2.2 0 0 1 1.54 0.66l4.18 4.18a2.2 2.2 0 0 1 0.66 1.54V31.7a2.2 2.2 0 0 1 -2.2 2.2H16.3a2.2 2.2 0 0 1 -2.2 -2.2V16.3a2.2 2.2 0 0 1 2.2 -2.2z">
                </path>

                <path d="M29.5 33.9v-7.7a1.1 1.1 0 0 0 -1.1 -1.1H19.6a1.1 1.1 0 0 0 -1.1 1.1v7.7">
                </path>

                <path d="M18.5 14.1v4.4a1.1 1.1 0 0 0 1.1 1.1h7.7">
                </path>
            </g>

            {dirty && <text x="40"
                y="18"
                fill="currentColor"
                stroke="none"
                fontSize="26"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
            >*</text>}

            {!dirty && <text x="40"
                y="14"
                fill="currentColor"
                stroke="none"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
            >✓</text>}

            {saveStatus === "saving" && <circle cx="24"
                cy="24"
                r="20"
                stroke="#00a2c7"
                strokeWidth="2"
                fill="transparent"
                strokeLinecap="round"
                className={css.circle}
            />}
        </svg>
    );
}