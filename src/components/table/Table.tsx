import { useRouter, useSearchParams } from "next/navigation";
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
    defaultSort?: string;
    debug?: boolean;
};

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

export default function Table({ headers, items, loading = false, defaultSort, debug = false }: TableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortMachine = new SortStateMachine(searchParams, defaultSort);
    const sortState = sortMachine.state;

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
