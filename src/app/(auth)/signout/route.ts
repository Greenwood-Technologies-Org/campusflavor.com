import { getServerClient } from "@/lib/db/db-server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const redirectTo = new URL(request.url);

    const supabase = getServerClient();
    const { error } = await supabase.auth.signOut();

    redirectTo.pathname = "/";
    return NextResponse.redirect(redirectTo);
}
