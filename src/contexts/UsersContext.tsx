"use client";

import { createContext, useContext } from "react";

import { useSupabaseCollection } from "@/hooks/useSupabaseCollection";

import type { Profile, UsersContextType, UsersProviderProps } from "@/types";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider(props: UsersProviderProps) {
  const {
    items: users,
    loading,
    setLoading,
    error,
    hasMore,
    deleteItem : deleteUser,
  } = useSupabaseCollection<Profile>({
    table: "profiles",
    page: props.page,
    pageSize: props.pageSize,
    search: props.search,
    searchColumn: "name", // e.g. search by name instead of title
    initialData: props.initialUsers,
  });

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        setLoading,
        page: props.page,
        search: props.search,
        error,
        hasMore,
        deleteUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used within UsersProvider");
  return ctx;
}
