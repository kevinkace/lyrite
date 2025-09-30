"use client";

import { createContext, useContext, useState } from "react";

import { EditingContextType } from "@/types";
import { useSong } from "./SongContext";

import { columnDefault, columnsOptions, fontFamilies, fontSizes } from "@/data/consts";
import { validateFontFamily } from "@/lib/fonts";

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export function EditingProvider({ children } : { children: React.ReactNode }) {
    const [selectedColor, setSelectedColor] = useState(null as number | null);
    const { song, setStyle, setSectionStyle } = useSong();


    const setColumns = (columns: number) => {
        if (!song) return;

        setStyle({ ...song.style, columns });
    };

    const stepColumns = (step: number) => {
        if (!song) return;

        const minColumns = columnsOptions[0];
        const maxColumns = columnsOptions[columnsOptions.length - 1];

        let columns = song.style?.columns || columnDefault;

        columns += step;

        if (columns < minColumns) columns = minColumns;
        if (columns > maxColumns) columns = maxColumns;

        setColumns(columns);
    };

    const setFontSize = (fontSize: number) => {
        if (!song) return;

        setStyle({ ...song.style, fontSize });
    };

    const stepFontSize = (step: number) => {
        if (!song) return;

        const currFontSizeIdx = fontSizes.findIndex(size => size === song.style?.fontSize);
        let newFontSizeIdx = currFontSizeIdx + step;

        if (newFontSizeIdx < 0) newFontSizeIdx = 0;
        if (newFontSizeIdx >= fontSizes.length) newFontSizeIdx = fontSizes.length - 1;

        const fontSize = fontSizes[newFontSizeIdx];

        setFontSize(fontSize);
    };

    const setFontFamily = (fontFamilyName: string) => {
        if (!song) return;

        if (!validateFontFamily(fontFamilyName)) {
            fontFamilyName = fontFamilies[0].name;
        }

        setStyle({ ...song.style, fontFamily: fontFamilyName });
    };

    const setSectionColor = (sectionId: number, color: number | null) => {
        if (!song) return;

        setSectionStyle(sectionId, { color });
    };

    return (
        <EditingContext.Provider value={{
            selectedColor,
            setSelectedColor,
            setColumns,
            stepColumns,
            setFontSize,
            stepFontSize,
            setFontFamily,
            setSectionColor
        }}>
            {children}
        </EditingContext.Provider>
    );
}

export function useEditing() {
    const context = useContext(EditingContext);
    if (!context) {
        throw new Error("useEditing must be used within an EditingProvider");
    }
    return context;
}
