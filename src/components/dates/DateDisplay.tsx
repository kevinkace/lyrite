import { dateLong, dateShort } from "@/lib/dates";

type DateDisplayStyle = "short" | "long";

type DateDisplayProps = {
    children: string | number | null | undefined;
    style?: DateDisplayStyle;
};

const formatters: Record<DateDisplayStyle, (value: string | number | undefined) => string | null> = {
    short : dateShort,
    long : dateLong
};

export function DateDisplay({ children, style = "short" }: DateDisplayProps) {
    return <time dateTime={typeof children === "string" ? children : undefined}>
        {formatters[style](children ?? undefined)}
    </time>;
}
