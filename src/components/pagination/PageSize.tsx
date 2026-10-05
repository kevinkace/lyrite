"use client";

import { Flex, Select } from "@radix-ui/themes";

import { PAGE_SIZE_OPTIONS } from "@/lib/pagination";

type PageSizeProps = {
    pageSize: number;
    onPageSizeChange: (pageSize: number) => void;
};

export default function PageSize({ pageSize, onPageSizeChange }: PageSizeProps) {
    return (
        <Flex align="center" gap="2">
            show:
            <Select.Root
                value={pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
            >
                <Select.Trigger id="page-size" aria-label="Items per page" />
                <Select.Content>
                    {PAGE_SIZE_OPTIONS.map((option) => (
                        <Select.Item key={option} value={option.toString()}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>
    );
}
