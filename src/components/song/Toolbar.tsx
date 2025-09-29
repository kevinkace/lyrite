import React from "react";

import { PlusIcon, MinusIcon, ColumnsIcon } from "@radix-ui/react-icons";
import { Flex, Button, Select, SegmentedControl } from "@radix-ui/themes"

import { useSong } from "@/contexts/SongContext";

import { colors, fontFamilies, fontSizes } from "@/data/consts";

import css from "./Toolbar.module.css";
import { getfontFamilyCSS } from "@/lib/fonts";

export default function Toolbar() {
    const { song, stepColumns, stepFontSize, setFontFamily, setFontSize } = useSong();

    if (!song) return null;

    return (<Flex align="center" justify="center" gap="3" className={css.toolbar} >

        {/* ==== FONT SIZE ==== */}
        <Flex data-tools="font-size" align="center">
            <Button variant="surface" size="2" color="gray" onClick={() => stepFontSize(-1)}>
                <MinusIcon />
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
                <PlusIcon />
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
                <MinusIcon />
            </Button>
            <ColumnsIcon />
            {song.style?.columns}
            <Button variant="outline" size="2" color="gray" onClick={() => stepColumns(1)}>
                <PlusIcon />
            </Button>
        </Flex>


        {/* ==== COLORS ==== */}
        <Flex data-tools="colors" align="center"
            className={css.colorTools}>
            <SegmentedControl.Root
                value={colors[0]}
            >
                {colors.map((color, idx) => (
                    <SegmentedControl.Item
                        key={color}
                        value={color as string}
                        className={css.colorButton}
                        data-color={idx}
                    >

                        {color}
                    </SegmentedControl.Item>
                ))}
            </SegmentedControl.Root>
        </Flex>


    </Flex>);
}