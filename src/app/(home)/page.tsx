import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";

import { SongsProvider } from "@/contexts/SongsContext";

import FeaturedSongs from "@/components/songs/FeaturedSongs";

import css from "./page.module.css"
import { FilePlusIcon } from "@radix-ui/react-icons";

const featuredIds = [
    "f4f5302c-57a5-49ea-aeaa-70c9c84bd656",
    "13f08d51-9295-431c-8e35-3ddc6459fa2f",
    "df7ebbdf-eb10-4a11-b87b-504a7f5c91a1"
];

export default function HomePage() {
    return (
        <SongsProvider ids={featuredIds} pageSize={10}>
            <div className={css.main}>
                <h2 className={css.usp}>
                    <em className={css.tagOrganize}>Organize</em>,{" "}
                    <em className={css.tagColor}>color</em>, and{" "}
                    <em className={css.tagStyle}>style</em>{" "}
                    your lyrics <br />
                    for a flawless performance
                </h2>


                <Flex gap="6" align="center" justify="center" className={css.ctaButtons}>
                    <Button asChild={true} size="4" variant="surface" color="violet">
                        <Link href="/songs/new">
                            <FilePlusIcon width="1em" height="auto" />
                            Create lyric sheet
                        </Link>
                    </Button>


                    <Button asChild={true} size="4" variant="soft">
                        <Link href="/register">Create a free account</Link>
                    </Button>
                </Flex>

                <FeaturedSongs />
            </div>
        </SongsProvider>
    );
}
