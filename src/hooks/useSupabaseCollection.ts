// useSupabaseCollection.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type UseSupabaseCollectionOptions<T> = {
  table: string;
  userId?: string;
  ids?: string[];
  page?: number;
  pageSize?: number;
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
  const [items, setItems] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (initialData.length > 0) return;

    const fetchData = async () => {
      // if (!userId && (!ids || ids.length === 0)) {
      //   setItems([]);
      //   return;
      // }

      setLoading(true);
      setError(null);

      let query = supabase.from(table).select("*");

      if (ids && ids.length > 0) {
        query = query.in("id", ids);
      } else if (userId) {
        query = query
          .eq("user_id", userId)
          .range((page - 1) * pageSize, page * pageSize - 1);

        if (search && searchColumn) {
          query = query.ilike(searchColumn, `%${search}%`);
        }
      }

      const { data, error } = await query;

      console.log(data, error);

      if (error) {
        setError(error.message);
      } else {
        setItems(data || []);
        setHasMore(!ids && (data?.length ?? 0) === pageSize);
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
    deleteItem,
    updateItem,
    updateItemInState,
  };
}
