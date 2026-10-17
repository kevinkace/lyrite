import { Flex } from "@radix-ui/themes";
import { CornerRightDown } from "lucide-react";

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
                        <LoginOr data-testid="home-create-account-cta" />
                    </Flex>

                    <Flex gap="2" direction="column" className={css.feat}>
                        <h3 className={css.how}>
                            See how it works
                            <CornerRightDown strokeWidth={4} size={18}/>
                        </h3>
                        <FeaturedSongs />
                    </Flex>
                </div>
            </SongsProvider>
        </Layout>
    );
}
