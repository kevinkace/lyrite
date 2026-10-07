import type { ComponentProps } from "react";
import { Switch, Flex, Text } from "@radix-ui/themes";

type PublicSwitchProps = {
    checked: boolean;
    onCheckedChange: ComponentProps<typeof Switch>["onCheckedChange"];
    showLabel?: boolean;
    direction?: ComponentProps<typeof Flex>["direction"];
    size?: ComponentProps<typeof Text>["size"];
};

export default function PublicSwitch({
    checked,
    onCheckedChange,
    showLabel = false,
    direction = "row",
    size = "3"
}: PublicSwitchProps) {
    return <Flex gap="2" direction={direction}>
        <Switch
            // `name` not supported
            // name="isPublic"
            checked={checked}
            onCheckedChange={onCheckedChange}
        />
        <Text size={size}>
            {showLabel && "public"}
        </Text>
    </Flex>;
}