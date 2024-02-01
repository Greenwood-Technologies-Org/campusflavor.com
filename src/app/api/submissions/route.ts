import { NextRequest, NextResponse } from "next/server"

import getDbClient from "@/lib/db/db-client"
import { handleApiResponse } from "@/lib/api/utils"

export async function POST(req: NextRequest) {
    const reqBody = await req.json()

    const dbClient = getDbClient()

    return NextResponse.json(handleApiResponse({}))
}
