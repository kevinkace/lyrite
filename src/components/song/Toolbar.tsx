import React, { useState } from "react";

import { Columns3, Minus, Plus } from "lucide-react";
import { Flex, Button, Select, SegmentedControl } from "@radix-ui/themes"

import { useSong } from "@/contexts/SongContext";
import { useEditing } from "@/contexts/EditingContext";

import { getfontFamilyCSS } from "@/lib/fonts";
import { colors, fontFamilies, fontSizes } from "@/data/consts";

import css from "./Toolbar.module.css";

export default function Toolbar() {
    const { song } = useSong();
     const { setSelectedColor, selectedColor, stepColumns, setFontSize, stepFontSize, setFontFamily } = useEditing();

    if (!song) return null;

    return (<Flex align="center" justify="center" gap="5" className={css.toolbar} >

        {/* ==== FONT SIZE ==== */}
        <Flex data-tools="font-size" align="center">
            <Button variant="surface" size="2" color="gray" onClick={() => stepFontSize(-1)}>
                <Minus />
            </Button>
            <Select.Root
                value={song.style.fontSize?.toString()}
                onValueChange={value => setFontSize(parseInt(value))}
            >
                <Select.Trigger />
                <Select.Content>
                    {fontSizes.map(size => (
                        <Select.Item key={size} value={size.toString()}>
                            {size}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
            <Button variant="surface" size="2" color="gray" onClick={() => stepFontSize(1)}>
                <Plus />
            </Button>
        </Flex>


        {/* ==== FONT FAMILY ==== */}
        <Flex data-tool="font-family" align="center">
            <Select.Root
                value={song.style.fontFamily}
                onValueChange={value => setFontFamily(value)}
            >
                <Select.Trigger />
                <Select.Content>
                    {fontFamilies.map(({ name }) => (
                        <Select.Item
                            key={name}
                            value={name}
                            style={{
                                fontFamily : getfontFamilyCSS(name)
                            }}
                        >
                            {name}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>


        {/* ==== COLUMNS ==== */}
        <Flex data-tools="columns" align="center" gap="2">
            <Button variant="outline" size="2" color="gray" onClick={() => stepColumns(-1)}>
                <Minus />
            </Button>
            <Columns3 />
            {song.style?.columns}
            <Button variant="outline" size="2" color="gray" onClick={() => stepColumns(1)}>
                <Plus />
            </Button>
        </Flex>


        {/* ==== COLORS ==== */}
        <Flex data-tools="colors" align="center"
            className={css.colorTools}>
            <SegmentedControl.Root
                value={selectedColor?.toString() || ""}
                onValueChange={(value) => {
                    console.log(value, typeof value);
                    setSelectedColor(parseInt(value, 10));
                }}
                onClick={(e) => {
                    e.preventDefault();

                    const target = e.target as HTMLElement;
                    const color = target.closest("[data-color]")?.getAttribute("data-color");

                    console.log({ color, selectedColor });

                    if (color === selectedColor?.toString()) {
                        setSelectedColor(null);
                    }
                }}
            >
                {colors.map((color, idx) => (
                    <SegmentedControl.Item
                        key={color}
                        value={idx.toString()}
                        className={css.colorButton}
                        data-color={idx}
                        data-colorname={color}
                    >
                        {color}
                    </SegmentedControl.Item>
                ))}
            </SegmentedControl.Root>
        </Flex>


    </Flex>);
}