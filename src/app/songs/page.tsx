"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SongList from "@/components/SongsList";

export default function SongsPage() {
    return (
        <div>
            <h1>Songs</h1>
            <SongList />
        </div>
    );
}
