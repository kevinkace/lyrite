import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

import Link from "next/link";

import { Flex, TextField, IconButton, Table as TableUI } from "@radix-ui/themes";
import { LayoutGrid, ListFilter, Table2 } from "lucide-react";

import css from "./Table.module.css";
import Pagination from "../pagination/Pagination";
import { Profile, Song, TableHeader } from "@/types";
import TableCell from "./TableCell";

export default function Table({ headers, search, hasMore, deleteItem, updateItem, setLoading, loading, error, items, page } :{
    headers: TableHeader[];
    search: string;
    hasMore: boolean;
    deleteItem?: (id: string) => Promise<void>;
    updateItem?: (id: string, data: any) => Promise<void>;
    setLoading: (loading: boolean) => void;
    loading: boolean;
    error: string | null;
    items: (Song | Profile)[];
    page?: number;

}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(search || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedSearch === search) return; // skip if unchanged

        const params = new URLSearchParams(searchParams.toString());

        params.set("search", debouncedSearch);
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }, [ debouncedSearch ]);

    return (
        <div className={css.wrapper}>
            <Flex gap="2" align="center" justify="between">
                <Flex gap="2" align="center">
                    <TextField.Root
                        type="text"
                        value={searchValue}
                        placeholder="Search songs..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={css.searchInput}
                    />

                    <IconButton variant="soft" color="gray">
                        <ListFilter />
                    </IconButton>
                </Flex>

                {/* <Flex gap="2" align="center">
                    <IconButton variant="soft" color="gray">
                        <Table2 />
                    </IconButton>
                    <IconButton variant="soft" color="gray">
                        <LayoutGrid />
                    </IconButton>
                </Flex> */}
            </Flex>

            {loading && <p>Loading...</p>}
            {error && <p className={css.error}>{error}</p>}

            <TableUI.Root className={css.table}>
                <TableUI.Header>
                    <TableUI.Row>
                        {headers.map((header) => (
                            <TableUI.ColumnHeaderCell
                                key={header.key}
                                align={header.align || "left"}>
                                {header.label}
                            </TableUI.ColumnHeaderCell>
                        ))}
                    </TableUI.Row>
                </TableUI.Header>

                <TableUI.Body>
                    {items.map((item) => (
                        <TableUI.Row key={item.id} data-key={item.id}>

                            {headers.map((header) => (
                                    <TableUI.Cell key={header.key + item.id}>
                                        <TableCell item={item} header={header} />
                                    </TableUI.Cell>
                            ))}

                        </TableUI.Row>
                    ))}
                </TableUI.Body>
            </TableUI.Root>


            <Pagination
                currentPage={page}
                hasMore={hasMore}
                setLoading={setLoading}
            />
        </div>
    );
}
