"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { useSetlist } from "@/contexts/SetlistContext";

type SetlistEditingContextType = {
    selectedSong: string;
    setSelectedSong: (songId: string) => void;
    saving: boolean;
    addSong: (setlistId: string) => Promise<void>;
    removeSong: (setlistId: string, songId: string) => Promise<void>;
};

const SetlistEditingContext = createContext<SetlistEditingContextType | undefined>(undefined);

export function SetlistEditingProvider({ children }: { children: ReactNode }) {
    const [selectedSong, setSelectedSong] = useState("");
    const [saving, setSaving] = useState(false);
    const { addSong: saveSong, removeSong } = useSetlist();

    const addSong = async (setlistId: string) => {
        if (!selectedSong) return;

        setSaving(true);
        try {
            await saveSong(setlistId, selectedSong);
            setSelectedSong("");
        } finally {
            setSaving(false);
        }
    };

    return (
        <SetlistEditingContext.Provider value={{ selectedSong, setSelectedSong, saving, addSong, removeSong }}>
            {children}
        </SetlistEditingContext.Provider>
    );
}

export function useSetlistEditing() {
    const context = useContext(SetlistEditingContext);
    if (!context) throw new Error("useSetlistEditing must be used within SetlistEditingProvider");
    return context;
}