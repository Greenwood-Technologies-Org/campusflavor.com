import { getServerClient } from "@/lib/db/db-server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
    const supabase = getServerClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/");
    }

    return <p>Hello {data.user.email}</p>;
}
