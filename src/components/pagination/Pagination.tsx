"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Flex, Button } from "@radix-ui/themes";

import { PaginationProps } from "@/types";

export default function Pagination({
    currentPage,
    totalPages,
    hasMore,
    setLoading
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        if (setLoading) setLoading(true);

        const params = new URLSearchParams(searchParams.toString());
        // unset page if going to first page
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }

        router.push(`?${params.toString()}`);
    };

    if (!currentPage) return null;

    return (
        <Flex justify="center" gap="2" mt="4">
            <Button
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                Prev
            </Button>

            {totalPages &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                        key={p}
                        variant={p === currentPage ? "solid" : "soft"}
                        color={p === currentPage ? "blue" : "gray"}
                        onClick={() => goToPage(p)}
                    >
                        {p}
                    </Button>
                ))}

            {!totalPages && (currentPage)}

            <Button
                variant="soft"
                disabled={
                    totalPages ? currentPage === totalPages : !hasMore
                }
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </Button>
        </Flex>
    );
}
