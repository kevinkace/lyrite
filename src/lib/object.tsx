import { User } from "@supabase/supabase-js";

// ts is crazy
export function getUserData(user : User, path: string) {
    const keys = path.split('.');

    let result: any = user; // eslint-disable-line @typescript-eslint/no-explicit-any


    for (const key of keys) {
        result = result?.[key];
    }

    return result;
}
