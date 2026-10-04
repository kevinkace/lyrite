import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { clsx } from "clsx";

import {
    Flex, Grid, Card,
    TextField, IconButton,
    Table as TableUI,
    SegmentedControl
} from "@radix-ui/themes";

import { Table2, LayoutGrid, Search, ArrowDown, ArrowUp, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Pagination from "@/components/pagination/Pagination";
import TableCell  from "./TableCell";

import { TableHeader, AnySupabaseCollection } from "@/types";

import css from "./Table.module.css";

type TableProps = {
    headers: TableHeader[];
    collection: AnySupabaseCollection;
    defaultSort?: string;
    search?: string;
    page?: number;
    debug?: boolean;
    emptyState?: ReactNode;
};

const DISPLAY_TYPES = ["table", "grid"] as const;
type DisplayType = typeof DISPLAY_TYPES[number];

type SortDirection = "asc" | "desc";

type SortState = {
    key: string | null;
    direction: SortDirection | null;
    arrow: LucideIcon | null;
};

const SORT_NONE = "none";

class SortStateMachine {
    private static readonly arrows: Record<SortDirection, LucideIcon> = {
        asc: ArrowUp,
        desc: ArrowDown
    };

    private static readonly noneState: SortState = {
        key: null,
        direction: null,
        arrow: X
    };

    readonly state: SortState;

    constructor(searchParams: URLSearchParams, defaultSort?: string) {
        const key = searchParams.get("sort");

        if (key === SORT_NONE) {
            this.state = SortStateMachine.noneState;
            return;
        }

        const direction = searchParams.get("direction") === "asc" ? "asc" : "desc";
        const activeKey = key || defaultSort || null;

        this.state = {
            key: activeKey,
            direction: activeKey ? direction : null,
            arrow: activeKey ? SortStateMachine.arrows[direction] : null
        };
    }

    next(key: string, firstDirection: SortDirection = "asc"): SortState {
        if (this.state.key !== key) {
            return this.createState(key, firstDirection);
        }

        if (this.state.direction === firstDirection) {
            return this.createState(
                key,
                firstDirection === "asc" ? "desc" : "asc"
            );
        }

        return SortStateMachine.noneState;
    }

    private createState(key: string, direction: SortDirection): SortState {
        return {
            key,
            direction,
            arrow: SortStateMachine.arrows[direction]
        };
    }
}

const icons: Record<DisplayType, LucideIcon> = {
    table: Table2,
    grid: LayoutGrid,
};

export default function Table({ headers, collection, defaultSort, search = "", page, debug = false, emptyState }: TableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortMachine = new SortStateMachine(searchParams, defaultSort);
    const sortState = sortMachine.state;

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

    const handleSort = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const header = headers.find(({ key: headerKey }) => headerKey === key);

        const nextState = sortMachine.next(key, header?.defaultSortDirection);

        if (!nextState.key) {
            params.set("sort", SORT_NONE);
            params.delete("direction");
        } else {
            params.set("sort", nextState.key);
            params.set("direction", nextState.direction!);
        }

        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const getNextSortState = (header: TableHeader) => sortMachine.next(
        header.key,
        header.defaultSortDirection
    );

    return (
        <Flex gap="4" direction="column">
            <Flex gap="2" align="center" justify="between">
                <Flex gap="2" align="center">
                    <div className={css.searchWrapper}>
                        <TextField.Root
                            type="text"
                            name="search"
                            value={searchValue}
                            placeholder="Search..."
                            onChange={(e) => setSearchValue(e.target.value)}
                            size="2"
                        />
                    </div>

                    <IconButton variant="soft" color="gray">
                        <Search />
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
                        return (
                            <Card className={css.card} key={item.id}>
                                {headers.map((header, index) => (
                                    <div
                                        key={header.key + item.id}
                                        className={index === 0 ? css.cardHeader : css.cardField}
                                    >
                                        {index > 0 && <span className={css.cardLabel}>{header.label}</span>}
                                        <TableCell item={item} header={header} />
                                    </div>
                                ))}
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
                                    align={header.align || "left"}
                                >
                                    {header.sortable ? (
                                        <button
                                            type="button"
                                            className={css.sortButton}
                                            onClick={() => handleSort(header.key)}
                                        >
                                            {header.label}
                                            <span className={css.sortWrapper}>
                                                <span
                                                    className={css.sortArrowCurrent}
                                                    aria-label={sortState.key === header.key ? `${sortState.direction} sort` : undefined}
                                                >
                                                    {(() => {
                                                        const CurrentArrow = sortState.key === header.key
                                                            ? sortState.arrow
                                                            : null;
                                                        return CurrentArrow && <CurrentArrow />;
                                                    })()}
                                                </span>
                                                <span
                                                    className={css.sortArrowNext}
                                                    aria-label="next sort"
                                                >
                                                    {(() => {
                                                        const NextArrow = getNextSortState(header).arrow;
                                                        return NextArrow && <NextArrow />;
                                                    })()}
                                                </span>
                                            </span>
                                        </button>
                                    ) : header.label}
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

            {!collection.loading && items.length === 0 && emptyState}

            <Pagination
                currentPage={page}
                totalPages={collection.pages}
                hasMore={collection.hasMore}
                setLoading={collection.setLoading}
            />
        </Flex>
    );
}
