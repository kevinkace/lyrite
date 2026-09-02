import type { Metadata } from "next";

import Layout   from "@/components/layout/Layout";
import Article from "@/components/layout/Article";

export const metadata: Metadata = {
    title: "Lyrite features",
    description: "How Lyrite can help you sing better, faster, and more confidently.",
};

export default function FeaturesPage() {
    return <Layout bg="mesh">
        <Article>
            <h1>The easiest way to edit<br/> and display lyrics for your next jam</h1>

            <h2>Font & text size</h2>
            <p>
                Pick from a curated set of system fonts, and size everything to fit your screen.<br/>
                Custom font uploads are coming soon.
            </p>

            <h2>Columns</h2>
            <p>
                Lyrics flow into columns so the whole song stays on one page — no more scrolling mid-verse.<br/>
                Set the column count to match your song&apos;s length.
            </p>

            <h2>Color-coded sections</h2>
            <p>
                Tag verses, choruses, and bridges with color so you always know where you are, even mid-song.
            </p>

            <h2>All your lyrics in one place</h2>
            <p>
                Create a free account to save every song you write or transcribe.<br/>
                Keep them private, or make them public to share with your bandmates.
            </p>

            <h2>Ready to get started?</h2>
            <p>
                Check out our <a href="/pricing">pricing</a> or create a free account and start jamming — <a href="/login">Sign up</a>
            </p>


        </Article>
    </Layout>;
}
