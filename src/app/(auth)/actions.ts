"use server";

import { getServerClient } from "@/lib/db/db-server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signin(formData: FormData) {
    const supabase = getServerClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}
