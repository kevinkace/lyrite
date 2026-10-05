import { Switch, Flex, Text } from "@radix-ui/themes";

export default function PublicSwitch({ checked, onCheckedChange, showLabel, direction = "row", size = "3" }) {
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