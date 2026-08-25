export type ChangeType = "feature" | "improvement" | "fix" | "breaking";

export type Change = {
    type: ChangeType;
    description: string;
};

export type Release = {
    version: string;
    date: string;
    title: string;
    changes: Change[];
};

export const releases: Release[] = [
    {
        version: "2.0.2",
        date : "2026-08-24",
        title: "Typos and readme",
        changes: [
            {
                type : "fix",
                description: "Change all instances of \"lyrite\" to \"Lyrite\""
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
                description: "Fix Microsoft Azure login"
            },
            {
                type: "improvement",
                description: "Update fallback icon to headshot silhouette instead of \"U\""
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
                description: "V1 migration guide"
            },
            {
                type: "feature",
                description: "Announcement news post"
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
                description: "Multi-provider OAuth authentication (GitHub, Google, Facebook, Microsoft)"
            },
            {
                type: "feature",
                description: "Passwordless email authentication with magic links"
            },
            {
                type: "feature",
                description: "This release notes page"
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
                description: "Song creation and management system"
            },
            {
                type: "feature",
                description: "User profiles and settings"
            },
            {
                type: "feature",
                description: "Responsive design with dark theme"
            },
            {
                type: "improvement",
                description: "Comprehensive error handling and user feedback"
            },
            {
                type: "improvement",
                description: "Dynamic version display in footer from package.json"
            }
        ]
    }
];