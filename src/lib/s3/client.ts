import { S3Client } from "@aws-sdk/client-s3";

const getS3Client = new S3Client({ region: "us-east-2" });

export { getS3Client };
