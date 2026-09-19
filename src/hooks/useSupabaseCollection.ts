"use client";

import { useEffect, useState } from "react";
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
}: UseSupabaseCollectionOptions<T>) {
    const [ items, setItems ]     = useState<T[]>(initialData);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ]     = useState<string | null>(null);
    const [ hasMore, setHasMore ] = useState(false);
    const [ pages, setPages ]     = useState<number>(1);
    const [ total, setTotal ]     = useState<number>(0);

    useEffect(() => {
        if (initialData.length > 0) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const currentPage = Math.max(page, 1);

            let dataQuery = supabase.from(table).select("*");
            let countQuery = supabase.from(table).select("*", { count: "exact", head: true });

            if (ids && ids.length > 0) {
                dataQuery = dataQuery.in("id", ids);
                countQuery = countQuery.in("id", ids);
            } else if (userId) {
                dataQuery = dataQuery
                    .eq("user_id", userId);

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
                dataQuery = dataQuery.order(orderBy, { ascending: orderAscending });
            }

            const [{ data, error }, { count, error: countError }] = await Promise.all([
                dataQuery,
                countQuery
            ]);

            if (error || countError) {
                setError(error?.message || countError?.message || "An error occurred");
            } else {
                setItems(data || []);
                setTotal(count || 0);
                setHasMore(!ids && (data?.length ?? 0) === pageSize);
                setPages(ids ? 1 : Math.ceil((count || 0) / pageSize));
            }

            setLoading(false);
        };

        fetchData();
    }, [table, userId, ids, page, search, pageSize, initialData.length, searchColumn, orderBy, orderAscending]);

    const deleteItem = async (id: string) => {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) {
            setError(error.message);
        } else {
            setItems((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const updateItemInState = (id: string, updates: Partial<T>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
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

        const { error } = await supabase.from(table).update(updates).eq("id", id);

        if (error && previous) {
            setItems((prev) =>
                prev.map((item) => (item.id === id ? previous! : item))
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
