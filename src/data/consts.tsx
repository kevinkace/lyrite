import { RadixColor } from "@/types";

export const userLinks = [
    {
        href: "/profile",
        label: "profile",
        icon: "profile"
    },
    {
        href: "/profile/songs",
        label: "lyric sheets",
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
    "default",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact"
];

export const colors : RadixColor[] = [
    "yellow",
    "red",
    "pink",
    "purple",
    "blue",
    "cyan"
];

export const columnDefault = 3;
export const columnsOptions = [1, 2, 3, 4, 5, 6];
export const defaultStyles = {
    fontFamily: fontFamilies[0],
    fontSize: fontSizeDefault,
    columns: columnDefault
};
