import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { clsx } from "clsx";

import { Flex, TextField, IconButton, Table as TableUI } from "@radix-ui/themes";
import { ListFilter } from "lucide-react";

import Pagination from "@/components/pagination/Pagination";
import TableCell  from "./TableCell";

import { TableHeader, AnySupabaseCollection } from "@/types";

import css from "./Table.module.css";

type TableProps = {
    headers: TableHeader[];
    collection: AnySupabaseCollection;
    search?: string;
    page?: number;
    debug?: boolean;
};

export default function Table({ headers, collection, search = "", page, debug = false }: TableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(search || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    // Determine the items array based on what's available in the collection
    const items = ('items' in collection && collection.items) ||
                  ('users' in collection && collection.users) ||
                  ('songs' in collection && collection.songs) ||
                  [];

    useEffect(() => {
        if (debouncedSearch === search) return; // skip if unchanged

        const params = new URLSearchParams(searchParams.toString());

        params.set("search", debouncedSearch);
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }, [ debouncedSearch, search, router, searchParams ]);

    return (
        <div className={css.wrapper}>
            <Flex gap="2" align="center" justify="between">
                <Flex gap="2" align="center">
                    <TextField.Root
                        type="text"
                        value={searchValue}
                        placeholder="Search..."
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

            {collection.error && <p className={css.error}>{collection.error}</p>}


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
                        { debug && <TableUI.ColumnHeaderCell align="left">DEBUG</TableUI.ColumnHeaderCell> }
                    </TableUI.Row>
                </TableUI.Header>


                <TableUI.Body className={clsx(css.tableBody, {
                    [css.tableLoading]: collection.loading
                })}>
                    {items.map((item) => (
                        <TableUI.Row key={item.id} data-key={item.id}>

                            {headers.map((header) => (
                                <TableUI.Cell key={header.key + item.id}>
                                    <TableCell item={item} header={header} />
                                </TableUI.Cell>
                            ))}

                            { debug && <TableUI.Cell align="left">
                                <pre style={{ fontSize: "10px", maxHeight: "200px", overflow: "auto" }}>
                                    {JSON.stringify(item, null, 2)}
                                </pre>
                            </TableUI.Cell> }

                        </TableUI.Row>
                    ))}
                </TableUI.Body>


            </TableUI.Root>


            <Pagination
                currentPage={page}
                hasMore={collection.hasMore}
                setLoading={collection.setLoading}
            />
        </div>
    );
}
