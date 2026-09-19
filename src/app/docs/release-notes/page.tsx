import { Card, Flex, Badge, Heading } from "@radix-ui/themes";
import type { Metadata } from "next";

import { releases, type ChangeType } from "@/data/releases";

import css from "./page.module.css";

export const metadata: Metadata = {
    title: "Release Notes - Lyrite",
    description: "Stay up to date with the latest features and improvements in Lyrite.",
};

const getChangeColor = (type: ChangeType) => {
    switch (type) {
        case "feature": return "green";
        case "improvement": return "blue";
        case "fix": return "orange";
        case "breaking": return "red";
        case "developer": return "iris";
        default: return "gray";
    }
};

const getChangeLabel = (type: ChangeType) => {
    switch (type) {
        case "feature": return "New";
        case "improvement": return "Improved";
        case "fix": return "Fixed";
        case "breaking": return "Breaking";
        case "developer": return "Developer";
        default: return type;
    }
};

const formatReleaseDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

export default function ReleaseNotesPage() {
    return (
            <div className={css.container}>
                <Heading size="8" mb="6">Release Notes</Heading>

                <Flex direction="column" gap="6">
                    {releases.map((release) => (
                        <Card key={release.version} size="3" className={css.releaseCard}>
                            <Flex direction="column" gap="4">
                                <Flex align="center" justify="between" wrap="wrap" gap="3">
                                    <h2 className={css.release}>
                                        v{release.version} - {release.title}
                                    </h2>
                                    <time dateTime={release.date} className={css.date}>
                                        {formatReleaseDate(release.date)}
                                    </time>
                                </Flex>

                                <Flex direction="column" gap="3">
                                    {release.changes.map((change, index) => (
                                        <Flex key={index} align="center" gap="4" className={css.changeItem}>
                                            <Badge color={getChangeColor(change.type)} size="2">
                                                {getChangeLabel(change.type)}
                                            </Badge>
                                            <div>
                                            <h3 className={css.changeTitle}>{change.title}</h3>
                                            {change.description && <p className={css.changeDescription}>{change.description}</p>}
                                            </div>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>

                <p>
                    Want to suggest a feature or report an issue? Visit our{" "}
                    <a href="https://github.com/kevinkace/lyrite" target="_blank" rel="noopener noreferrer">
                        GitHub repository
                    </a>
                </p>
            </div>
    );
}