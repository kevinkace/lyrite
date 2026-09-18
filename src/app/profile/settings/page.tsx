import { Flex } from "@radix-ui/themes";

import { AuthData } from "@/components/profile/AuthData";
import { AuthDebug } from "@/components/profile/AuthDebug";
import { Pii } from "@/components/profile/Pii";

export default function SettingsPage() {

    return (
        <Flex direction="column" gap="4" align="start">

            <AuthData />

            <Pii />

            <AuthDebug />
        </Flex>
    );
}
