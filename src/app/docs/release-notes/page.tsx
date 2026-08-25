import Layout from "@/components/layout/Layout";
import { Card, Flex, Badge, Heading, Text } from "@radix-ui/themes";
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
        default: return "gray";
    }
};

const getChangeLabel = (type: ChangeType) => {
    switch (type) {
        case "feature": return "New";
        case "improvement": return "Improved";
        case "fix": return "Fixed";
        case "breaking": return "Breaking";
        default: return type;
    }
};

export default function ReleaseNotesPage() {
    return (
        <Layout>
            <div className={css.container}>
                <Heading size="8" mb="6">Release Notes</Heading>

                <Flex direction="column" gap="6">
                    {releases.map((release) => (
                        <Card key={release.version} size="3" className={css.releaseCard}>
                            <Flex direction="column" gap="4">
                                <Flex align="center" justify="between" wrap="wrap" gap="3">
                                    <Heading size="6">
                                        v{release.version} - {release.title}
                                    </Heading>
                                    <Text size="2" color="gray">
                                        {new Date(release.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                    </Text>
                                </Flex>

                                <Flex direction="column" gap="3">
                                    {release.changes.map((change, index) => (
                                        <Flex key={index} align="center" gap="3" className={css.changeItem}>
                                            <Badge color={getChangeColor(change.type)} size="2">
                                                {getChangeLabel(change.type)}
                                            </Badge>
                                            <Text size="3">{change.description}</Text>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>

                <Text size="2" color="gray" align="center" mt="8">
                    Want to suggest a feature or report an issue? Visit our{" "}
                    <a href="https://github.com/kevinkace/lyrite" target="_blank" rel="noopener noreferrer">
                        GitHub repository
                    </a>
                </Text>
            </div>
        </Layout>
    );
}