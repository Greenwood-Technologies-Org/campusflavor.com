import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import GlobalConfig from "@/lib/config/global";
import getDbClient from "@/lib/db/db-client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { handleApiResponse } from "@/lib/api/utils";

export async function POST(req: NextRequest) {
    const reqBody = await req.json();

    const dbClient = getDbClient();

    const s3Client = new S3Client({ region: GlobalConfig.s3.region });
    const command = new PutObjectCommand({
        Bucket: GlobalConfig.s3.bucket,
        Key: "file-key.ext",
    });
    const presignedUploadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: GlobalConfig.s3.presignedUrlExpireIn,
    });

    return NextResponse.json(handleApiResponse({}));
}
