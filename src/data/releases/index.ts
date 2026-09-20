export type ChangeType = "feature" | "improvement" | "fix" | "breaking" | "developer";

export type Change = {
    type: ChangeType;
    title: string;
    description?: string;
};

export type Release = {
    version: string;
    date: string;
    title: string;
    changes: Change[];
};

export const releases: Release[] = [
    {
        version: "2.5.0",
        date: "2026-09-20",
        title: "Table column sort",
        changes: [
            {
                type: "feature",
                title: "Sort table columns"
            },
        ]
    },
    {
        version: "2.4.4",
        date: "2026-09-19",
        title: "Table items count",
        changes: [
            {
                type: "fix",
                title: "Add next item when deleting an item from a table",
            },
        ]
    },
    {
        version: "2.4.3",
        date: "2026-09-19",
        title: "Table size and pagination",
        changes: [
            {
                type: "fix",
                title: "Table size and pagination",
            },
        ]
    },
    {
        version: "2.4.2",
        date: "2026-09-19",
        title: "Tier cleanup",
        changes: [
            {
                type: "fix",
                title: "Hide upgrade prompt when already Premium",
            },
            {
                type : "improvement",
                title : "Hide announce banner by default",
                description: "This prevent flash of banner after previously closing. Added a button to profile to reset banner state."
            },
            {
                type: "fix",
                title: "Release note day was off by one",
            },
        ]
    },
    {
        version: "2.4.1",
        date: "2026-09-18",
        title: "Handle tier limitations",
        changes: [
            {
                type: "improvement",
                title: "See upgrade options when trying to create more song's that tier allows",
            },
            {
                type : "feature",
                title : "Auto save!"
            }
        ]
    },
    {
        version: "2.2.0",
        date: "2026-09-16",
        title: "User tiers and Support",
        changes: [
            {
                type: "feature",
                title: "Added user tiers!",
                description: "See pricing page for details on tiers. Not yet available for purchase, but tier restrictions are in place."
            },
            {
                type: "improvement",
                title: "Added Support page"
            },
            {
                type: "improvement",
                title: "Docs now have metatags"
            },
            {
                type: "improvement",
                title: "Profile page mobile style"
            },
            {
                type: "developer",
                title: "Local Supabase stack"
            },
            {
                type: "developer",
                title: "De-dupe Markdown pages"
            }
        ]
    },
    {
        version: "2.1.0",
        date: "2026-08-30",
        title: "Tests",
        changes: [
            {
                type: "developer",
                title: "Added tests"
            },
            {
                type: "fix",
                title: "Fix footer Github link"
            }
        ]
    },
    {
        version: "2.0.2",
        date : "2026-08-24",
        title: "Typos and readme",
        changes: [
            {
                type : "fix",
                title: "Change all instances of \"lyrite\" to \"Lyrite\""
            }
        ]
    },
    {
        version: "2.0.1",
        date : "2026-08-24",
        title: "Login and profile bug fixes",
        changes: [
            {
                type : "fix",
                title: "Fix Microsoft Azure login"
            },
            {
                type: "improvement",
                title: "Update fallback icon to headshot silhouette instead of \"U\""
            }
        ]
    },
    {
        version: "2.0.0",
        date: "2026-08-20",
        title: "Preview Release Live",
        changes: [
            {
                type: "feature",
                title: "V1 migration guide"
            },
            {
                type: "feature",
                title: "Announcement news post"
            }
        ]
    },
    {
        version: "0.2.0",
        date: "2026-02-28",
        title: "Preview Release",
        changes: [
            {
                type: "feature",
                title: "Multi-provider OAuth authentication",
                description: "GitHub, Google, Facebook, Microsoft"
            },
            {
                type: "feature",
                title: "Passwordless email authentication with magic links"
            },
            {
                type: "feature",
                title: "This release notes page"
            }
        ]
    },
    {
        version: "0.1.0",
        date: "2026-02-27",
        title: "Preview Release",
        changes: [
            {
                type: "feature",
                title: "Song creation and management system"
            },
            {
                type: "feature",
                title: "User profiles and settings"
            },
            {
                type: "feature",
                title: "Responsive design with dark theme"
            },
            {
                type: "improvement",
                title: "Comprehensive error handling and user feedback"
            },
            {
                type: "improvement",
                title: "Dynamic version display in footer from package.json"
            }
        ]
    }
];