"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Flex, Button } from "@radix-ui/themes";

type PaginationProps = {
    currentPage: number;
    totalPages?: number; // optional if you only want prev/next
    hasMore?: boolean;   // fallback if you don’t have totalPages
};

export default function Pagination({
    currentPage,
    totalPages,
    hasMore,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
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
