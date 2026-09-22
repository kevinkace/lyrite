import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { FilePlus } from "lucide-react";

import { SongsProvider } from "@/contexts/SongsContext";

import { createServerSupabaseClient } from "@/lib/supabase/server";

import Layout        from "@/components/layout/Layout";
import FeaturedSongs from "@/components/songs/FeaturedSongs";
import LoginOr       from "@/components/buttons/LoginOr";

import css from "./page.module.css"

export default async function HomePage() {
    const supabase = await createServerSupabaseClient();

    const { data : featuredSongs } = await supabase
        .from("songs")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: true })
        .limit(3);

    return (
        <Layout bg={"mesh"}>
            <SongsProvider initialSongs={featuredSongs || []}>
                <div className={css.main}>
                    <h2 className={css.usp} data-testid="home-usp">
                        <em className={css.tagOrganize}>Organize</em>,{" "}
                        <em className={css.tagColor}>color</em>, and{" "}
                        <em className={css.tagStyle}>style</em>{" "}
                        your song lyrics <br />
                        for a flawless performance
                    </h2>


                    <Flex
                        direction={{
                            initial : "column",
                            md : "row"
                        }}
                        gap={{
                            initial : "2",
                            md : "4"
                        }}
                        align="center"
                        justify="center"
                        className={css.ctaButtons}
                    >
                        <Button asChild size="4" variant="surface" color="violet">
                            <Link href="/songs/new" data-testid="home-new-song-cta">
                                <FilePlus width="1em" height="auto" />
                                Start a new song
                            </Link>
                        </Button>


                        <LoginOr data-testid="home-create-account-cta" />
                    </Flex>

                    <FeaturedSongs />
                </div>
            </SongsProvider>
        </Layout>
    );
}
