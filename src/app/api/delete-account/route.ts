import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST() {
    const supabase = createServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user-related rows (safe for your existing client)
    await Promise.all([
        supabase.from("profiles").delete().eq("id", user.id),
        supabase.from("songs").delete().eq("user_id", user.id),
    ]);

    // Delete the user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }

    // sign them out
    await supabase.auth.signOut();

    return NextResponse.json({ success: true });
}
