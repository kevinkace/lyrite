import { RadixColor } from "@/types";

export const userLinks = [
    {
        href: "/profile",
        label: "profile",
        icon: "profile"
    },
    {
        href: "/profile/songs",
        label: "my songs",
        icon: "file"
    },
    {
        href: "/profile/settings",
        label: "settings",
        icon: "settings"
    }
];

export const fontSizes = [
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    24,
    30,
    36,
    48,
    60,
    72
];

export const fontSizeDefault = 16;

export const fontFamilies = [
    { name: "System UI", css: `-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"` },
    { name: "Arial/Helvetica", css: "Arial, Helvetica, sans-serif" },
    { name: "Verdana/Geneva", css: "Verdana, Geneva, sans-serif" },
    { name: "Trebuchet MS/Helvetica", css: "'Trebuchet MS', Helvetica, sans-serif" },
    { name: "Gill Sans/Calibri", css: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif" },
    { name: "Tahoma/Geneva", css: "Tahoma, Geneva, sans-serif" },
    { name: "Lucida Grande", css: "'Lucida Grande', 'Lucida Sans Unicode', sans-serif" },

    { name: "Times New Roman", css: "'Times New Roman', Times, serif" },
    { name: "Georgia", css: "Georgia, serif" },
    { name: "Palatino", css: "Palatino, 'Palatino Linotype', 'Book Antiqua', serif" },

    { name: "Courier New", css: "'Courier New', Courier, monospace" },
    { name: "Lucida Console", css: "'Lucida Console', Monaco, monospace" },
    { name: "monospace", css: "monospace" }
];

export const colors: RadixColor[] = [
    "yellow",
    "red",
    "green",
    "purple",
    "blue",
    "orange"
];

export const columnDefault = 3;

export const columnsOptions = [1, 2, 3, 4, 5, 6];

export const defaultStyles = {
    fontFamily: fontFamilies[0].name,
    fontSize: fontSizeDefault,
    columns: columnDefault
};

export const doubleLineBreak = "\n\n";
