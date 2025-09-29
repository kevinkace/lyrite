import { fontFamilies } from "@/data/consts";

export function getfontFamilyCSS(fontFamilyName) {
    const font = fontFamilies.find(({ name }) => name === fontFamilyName);

    return font ? font.css : fontFamilies[0].css;
}

export function validateFontFamily(fontFamilyName) {
    return fontFamilies.some(({ name }) => name === fontFamilyName);
}
