import { dateLong, dateShort } from "@/lib/dates";

const formatters = {
    short : dateShort,
    long : dateLong
}

export function DateDisplay({ children, style = "short" }) {
    return <time dateTime={children}>
        {formatters[style](children)}
    </time>;
}
