export const ANNOUNCEMENT_BANNERS = {
    release: {
        storageKey: "announce-v2-closed",
        href: "/docs/announcing-lyrite-v2",
        prefix: "NEW!",
        message: "Announcing Lyrite version 2!",
        suffix: "read more",
        excludedPath: "/docs/announcing-lyrite-v2"
    },
    anonymousSong: {
        storageKey: "announce-anonymous-song-closed",
        href: "/login",
        prefix: null,
        message: "Your songs are saved on this device only! Create a <u>free account</u> to sync them across devices.",
        suffix: null,
        excludedPath: null
    }
} as const;

export const ANNOUNCEMENT_STORAGE_KEY = ANNOUNCEMENT_BANNERS.release.storageKey;
