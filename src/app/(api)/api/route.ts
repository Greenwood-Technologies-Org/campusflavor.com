import { NextResponse } from "next/server";
import { handleApiResponse } from "@/lib/api/utils";
import { sendEmail } from "@/lib/api/send-mail";

export async function GET() {
    await sendEmail();

    return NextResponse.json(handleApiResponse({ message: "email sent" }));
}
