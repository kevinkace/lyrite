import Layout from "@/components/layout/Layout";
import { Heading, Text } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Migration Guide - lyrite v2",
    description: "How to migrate from lyrite v1 to v2",
};

export default function MigrationPage() {
    return (
        <Layout>
            <Heading size="8" mb="4">Migration Guide</Heading>
            <Text size="3">Instructions to migrate from v1 to v2 will be provided here. Stub content.</Text>
        </Layout>
    );
}
