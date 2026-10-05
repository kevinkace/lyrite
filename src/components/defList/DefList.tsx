import { Text } from "@radix-ui/themes";
import { clsx } from "clsx";

import { DateDisplay } from "@/components/dates/DateDisplay";

import  css from "./DefList.module.css";

export function DefList({ items }: { items: Array<{ key : string, label: string; value: string | null }> }) {
    return (
        <dl className={css.dl}>
            {items.map(({ key, label, value }) => {

                const dateType = key.includes("_at") && value;

                return (
                    <div key={label} className={css.row}>
                        <dt className={css.label}>
                            <Text size="2" weight="medium">
                                {label}
                            </Text>
                        </dt>

                        <dd className={clsx(
                            css.value,
                            {[css.id] : key === "id"}
                        )}>
                            <Text size="2">
                                {dateType && <DateDisplay style="long">{value}</DateDisplay>}
                                {!dateType && String(value ?? "—")}
                            </Text>
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}