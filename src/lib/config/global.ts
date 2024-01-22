interface S3Config {
    bucket: string;
    region: string;
    presignedUrlExpireIn: number; // in s
}

interface Config {
    s3: S3Config;
}

const GlobalConfig: Config = {
    s3: {
        bucket: "campusflavor",
        region: "us-east-2",
        presignedUrlExpireIn: 60 * 60, // 1 hour 
    }
}

export default GlobalConfig;