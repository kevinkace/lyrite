"use client";

import { createContext, ReactNode, useContext } from "react";

import { useSupabaseCollection } from "@/hooks/useSupabaseCollection";
import type { Setlist, SetlistsCollection } from "@/types";

type SetlistsContextType = SetlistsCollection & {
    createSetlist: (title: string, isPublic: boolean) => Promise<Setlist>;
    updateSetlist: (id: string, updates: Partial<Setlist>) => Promise<void>;
    deleteSetlist: (id: string) => Promise<void>;
};

const SetlistsContext = createContext<SetlistsContextType | undefined>(undefined);

export function SetlistsProvider({
    children,
    userId,
    page,
    search,
    sort,
    sortAscending,
    pageSize,
}: {
    children: ReactNode;
    userId?: string;
    page?: number;
    search?: string;
    sort?: string;
    sortAscending?: boolean;
    pageSize?: number;
}) {
    const setlistsCollection = useSupabaseCollection<Setlist>({
        table: "setlists",
        userId,
        page,
        search,
        searchColumn: "title",
        pageSize,
        orderBy: sort === undefined ? "updated_at" : sort || undefined,
        orderAscending: sort === undefined ? false : sortAscending,
        countRelation: "setlist_songs",
    });

    const createSetlist = async (title: string, isPublic: boolean) => {
        if (!userId) throw new Error("You must be logged in to create a setlist");

        const { data, error: createError } = await supabase
            .from("setlists")
            .insert({ title, user_id: userId, is_public: isPublic })
            .select()
            .single();

        if (createError || !data) throw createError || new Error("Unable to create setlist");

        const created = data as Setlist;
        setlistsCollection.setItems((current) => [created, ...current]);
        return created;
    };

    const deleteSetlist = async (id: string) => {
        await setlistsCollection.deleteItem(id);
    };

    const updateSetlist = async (id: string, updates: Partial<Setlist>) => {
        await setlistsCollection.updateItem(id, updates);
    };

    return (
        <SetlistsContext.Provider value={{
            setlists: setlistsCollection.items,
            loading: setlistsCollection.loading,
            setLoading: setlistsCollection.setLoading,
            error: setlistsCollection.error,
            hasMore: setlistsCollection.hasMore,
            pages: setlistsCollection.pages,
            total: setlistsCollection.total,
            page,
            search,
            createSetlist,
            updateSetlist,
            deleteSetlist,
        }}>
            {children}
        </SetlistsContext.Provider>
    );
}

export function useSetlists() {
    const context = useContext(SetlistsContext);
    if (!context) throw new Error("useSetlists must be used within SetlistsProvider");
    return context;
}