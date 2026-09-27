"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type UseSupabaseCollectionOptions<T> = {
    table: string;
    userId?: string;
    ids?: string[];
    page?: number;
    pageSize?: number;
    pages?: number;
    search?: string;
    initialData?: T[];
    searchColumn?: string;
    orderBy?: string;
    orderAscending?: boolean;
    countRelation?: string;
};

export function useSupabaseCollection<T extends { id: string }>({
    table,
    userId,
    ids,
    page = 0,
    pageSize = 20,
    search,
    initialData = [],
    searchColumn = "title",
    orderBy,
    orderAscending = true,
    countRelation,
}: UseSupabaseCollectionOptions<T>) {
    const [ items, setItems ]     = useState<T[]>(initialData);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ]     = useState<string | null>(null);
    const [ hasMore, setHasMore ] = useState(false);
    const [ pages, setPages ]     = useState<number>(1);
    const [ total, setTotal ]     = useState<number>(0);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const currentPage = Math.max(page, 1);

        let dataQuery = supabase
            .from(table)
            .select(countRelation ? `*, ${countRelation}(count)` : "*");

        let countQuery = supabase
            .from(table)
            .select("*", { count: "exact", head: true });

        if (ids && ids.length > 0) {
            dataQuery = dataQuery.in("id", ids);
            countQuery = countQuery.in("id", ids);
        } else if (userId) {
            dataQuery = dataQuery.eq("user_id", userId);
            countQuery = countQuery.eq("user_id", userId);
        }

        if (search && searchColumn) {
            dataQuery = dataQuery.ilike(searchColumn, `%${search}%`);
            countQuery = countQuery.ilike(searchColumn, `%${search}%`);
        }

        if (!ids || ids.length === 0) {
            dataQuery = dataQuery.range(
                (currentPage - 1) * pageSize,
                currentPage * pageSize - 1
            );
        }

        if (orderBy) {
            dataQuery = dataQuery.order(orderBy, {
                ascending: orderAscending,
            });
        }

        const [{ data, error }, { count, error: countError }] =
            await Promise.all([
                dataQuery,
                countQuery,
            ]);

        if (error || countError) {
            setError(
                error?.message ||
                countError?.message ||
                "An error occurred"
            );
        } else {
            const items = (data || []).map((item) => {
                if (!countRelation) return item;

                const relation = item[countRelation] as
                    | { count: number }[]
                    | undefined;

                return {
                    ...item,
                    [`${countRelation}_count`]: relation?.[0]?.count ?? 0,
                };
            });

            setItems(items);
            setTotal(count || 0);
            setHasMore(!ids && items.length === pageSize);
            setPages(ids ? 1 : Math.ceil((count || 0) / pageSize));
        }

        setLoading(false);
    }, [
        countRelation,
        ids,
        orderAscending,
        orderBy,
        page,
        pageSize,
        search,
        searchColumn,
        table,
        userId,
    ]);

    useEffect(() => {
        if (initialData.length > 0) return;

        fetchData();
    }, [fetchData, initialData.length]);

    const deleteItem = async (id: string) => {
        const { error } = await supabase.from(table).delete().eq("id", id);

        if (error) {
            setError(error.message);
        } else {
            await fetchData();
        }
    };

    const updateItemInState = (id: string, updates: Partial<T>) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...updates } : item
            )
        );
    };

    const updateItem = async (id: string, updates: Partial<T>) => {
        let previous: T | undefined;

        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    previous = item;
                    return { ...item, ...updates };
                }

                return item;
            })
        );

        const { error } = await supabase
            .from(table)
            .update(updates)
            .eq("id", id);

        if (error && previous) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? previous! : item
                )
            );
            setError(error.message);
        }
    };

    return {
        items,
        setItems,
        loading,
        setLoading,
        error,
        setError,
        hasMore,
        pages,
        total,
        deleteItem,
        updateItem,
        updateItemInState,
    };
}