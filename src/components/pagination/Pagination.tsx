"use client";

import { Flex, Button } from "@radix-ui/themes";

import { PaginationProps } from "@/types";

export default function Pagination({
    currentPage,
    totalPages,
    hasMore,
    onPageChange
}: PaginationProps) {
    return (
        <Flex justify="center" gap="2" mt="4" align="center">
            <Button
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </Button>

            {totalPages ?
                Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                        key={p}
                        variant="soft"
                        color={p === currentPage ? undefined : "gray"}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </Button>
                )) :
                null
            }

            {!totalPages && (currentPage)}

            <Button
                variant="soft"
                disabled={
                    totalPages ? currentPage === totalPages : !hasMore
                }
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </Flex>
    );
}
