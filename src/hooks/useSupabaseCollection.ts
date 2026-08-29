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
};

export function useSupabaseCollection<T>({
    table,
    userId,
    ids,
    page = 0,
    pageSize = 20,
    search,
    initialData = [],
    searchColumn = "title",
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

            let dataQuery = supabase.from(table).select("*");
            let countQuery = supabase.from(table).select("*", { count: "exact", head: true });

            if (ids && ids.length > 0) {
                dataQuery = dataQuery.in("id", ids);
                countQuery = countQuery.in("id", ids);
            } else if (userId) {
                dataQuery = dataQuery
                    .eq("user_id", userId)
                    .range((page - 1) * pageSize, page * pageSize - 1);

                countQuery = countQuery.eq("user_id", userId);

                if (search && searchColumn) {
                    dataQuery = dataQuery.ilike(searchColumn, `%${search}%`);
                    countQuery = countQuery.ilike(searchColumn, `%${search}%`);
                }
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
    }, [table, userId, ids, page, search, pageSize, initialData.length, searchColumn]);

    const deleteItem = async (id: string) => {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) {
            setError(error.message);
        } else {
            setItems((prev) => prev.filter((item: any) => item.id !== id));
        }
    };

    const updateItemInState = (id: string, updates: Partial<T>) => {
        setItems((prev) =>
            prev.map((item: any) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    const updateItem = async (id: string, updates: Partial<T>) => {
        let previous: T | undefined;

        setItems((prev) =>
            prev.map((item: any) => {
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
                prev.map((item: any) => (item.id === id ? previous! : item))
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
