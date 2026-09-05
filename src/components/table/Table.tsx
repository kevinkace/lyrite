import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { clsx } from "clsx";

import {
    Flex, Grid, Card,
    TextField, IconButton,
    Table as TableUI,
    SegmentedControl
} from "@radix-ui/themes";

import { ListFilter, Table2, LayoutGrid } from "lucide-react";

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

const DISPLAY_TYPES = ["table", "grid"] as const;
type DisplayType = typeof DISPLAY_TYPES[number];

const icons: Record<DisplayType, LucideIcon> = {
    table: Table2,
    grid: LayoutGrid,
};

export default function Table({ headers, collection, search = "", page, debug = false }: TableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(search || "");
    const debouncedSearch = useDebounce(searchValue, 500);
    const [ displayType, setDisplayType ] = useState<DisplayType>("table");

    // Determine the items array based on what's available in the collection
    const items = ('items' in collection && collection.items) ||
                  ('users' in collection && collection.users) ||
                  ('songs' in collection && collection.songs) ||
                  [];

    useEffect(() => {
        if (window.innerWidth < 768) {
            setDisplayType("grid");
        }

        if (debouncedSearch === search) return; // skip if unchanged

        const params = new URLSearchParams(searchParams.toString());

        params.set("search", debouncedSearch);
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }, [ debouncedSearch, search, router, searchParams ]);

    return (
        <Flex gap="4" direction="column">
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

                <Flex gap="2" align="center" className={css.displayTypeToggle}>

                    <SegmentedControl.Root
                        value={displayType}
                        onValueChange={(value) => setDisplayType(value as DisplayType)}
                    >
                        {DISPLAY_TYPES.map((type) => {
                            const Icon = icons[type];

                            return (
                                <SegmentedControl.Item value={type} key={type}>
                                    <Flex align="center" justify="center">
                                        <Icon />
                                    </Flex>
                                </SegmentedControl.Item>
                            );
                        })}
                    </SegmentedControl.Root>
                </Flex>
            </Flex>

            {collection.error && <p className={css.error}>{collection.error}</p>}


            {displayType === "grid" && (
                <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
                    {items.map((item) => {
                        const publicHeader = headers.find(({ key }) => key === "is_public");
                        const actionsHeader = headers.find(({ key }) => key === "actions");

                        return (
                            <Card className={css.card} key={item.id}>

                                <Link href={headers[0].href(item)}className={css.cardHeader}>
                                    <h4 className={css.cardTitle}>{item.title}</h4>
                                    <h5 className={css.cardArtist}>{item.artist}</h5>
                                </Link>

                                <div className={css.cardContent}>
                                    <TableCell item={item} header={{ key : "lyrics" }}/>
                                </div>

                                <Flex className={css.cardFooter} align="center" justify="between">
                                    <Flex gap="3" align="center">
                                        <TableCell item={item} header={publicHeader} label={true}/>
                                    </Flex>

                                    <TableCell item={item} header={actionsHeader} />
                                </Flex>
                            </Card>
                        );
                    })}
                </Grid>
            )}

            {displayType === "table" && (

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
            )}


            <Pagination
                currentPage={page}
                hasMore={collection.hasMore}
                setLoading={collection.setLoading}
            />
        </Flex>
    );
}
