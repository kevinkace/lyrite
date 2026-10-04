import { clsx } from "clsx";

import { Table as TableUI } from "@radix-ui/themes";

import { ArrowDown, ArrowUp, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import TableCell  from "./TableCell";

import type { Profile, Song, TableHeader } from "@/types";

import css from "./Table.module.css";

type TableProps = {
    headers: TableHeader[];
    items: (Song | Profile)[];
    loading?: boolean;
    sort?: string;
    sortAscending?: boolean;
    onSort?: (column: string, defaultDirection?: SortDirection) => void;
    debug?: boolean;
};

type SortDirection = "asc" | "desc";
export default function Table({
    headers,
    items,
    loading = false,
    sort,
    sortAscending = false,
    onSort,
    debug = false
}: TableProps) {
    const arrows: Record<SortDirection, LucideIcon> = {
        asc: ArrowUp,
        desc: ArrowDown
    };

    const getNextArrow = (header: TableHeader) => {
        const firstDirection = header.defaultSortDirection ?? "asc";
        if (sort !== header.key) return arrows[firstDirection];
        if (sortAscending === (firstDirection === "asc")) {
            return arrows[firstDirection === "asc" ? "desc" : "asc"];
        }
        return X;
    };

    return (
        <TableUI.Root className={css.table}>

                    <TableUI.Header>
                        <TableUI.Row>
                            {headers.map((header) => (
                                <TableUI.ColumnHeaderCell
                                    key={header.key}
                                    align={header.align || "left"}
                                >
                                    {header.sortable && onSort ? (
                                        <button
                                            type="button"
                                            className={css.sortButton}
                                            onClick={() => onSort(header.key, header.defaultSortDirection)}
                                        >
                                            {header.label}
                                            <span className={css.sortWrapper}>
                                                <span
                                                    className={css.sortArrowCurrent}
                                                    aria-label={sort === header.key ? `${sortAscending ? "asc" : "desc"} sort` : undefined}
                                                >
                                                    {sort === header.key && (sortAscending ? <ArrowUp /> : <ArrowDown />)}
                                                </span>
                                                <span
                                                    className={css.sortArrowNext}
                                                    aria-label="next sort"
                                                >
                                                    {(() => {
                                                        const NextArrow = getNextArrow(header);
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
                        [css.tableLoading]: loading
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
    );
}
