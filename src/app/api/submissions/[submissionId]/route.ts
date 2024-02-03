import { NextRequest, NextResponse } from "next/server";

import getDbClient from "@/lib/db/db-client";
import { handleApiResponse } from "@/lib/api/utils";

export async function GET(
    req: NextRequest,
    context: { params: { submissionId: string } }
) {
    const submissionId = context.params.submissionId;
    const dbClient = getDbClient();

    return NextResponse.json(handleApiResponse({}));
}
