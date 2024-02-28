import { NextResponse } from "next/server";
import { handleApiResponse } from "@/lib/api/utils";

export async function GET() {
    return NextResponse.json(handleApiResponse({ message: "email sent" }));
}
