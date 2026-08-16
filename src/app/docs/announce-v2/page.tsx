import Layout from "@/components/layout/Layout";
import { Heading, Text } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Announcing lyrite v2",
    description: "Announcing lyrite version 2",
};

export default function AnnouncePage() {
    return (
        <Layout>
            <Heading size="8" mb="4">Announcing lyrite v2</Heading>
            <Text size="3">This page announces lyrite version 2. Content coming soon.</Text>
        </Layout>
    );
}
