import { fontFamilies } from "@/data/consts";

export function getfontFamilyCSS(fontFamilyName : string) {
    const font = fontFamilies.find(({ name }) => name === fontFamilyName);

    return font ? font.css : fontFamilies[0].css;
}

export function validateFontFamily(fontFamilyName : string) {
    return fontFamilies.some(({ name }) => name === fontFamilyName);
}
