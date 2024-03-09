interface S3Config {
    bucket: string;
    region: string;
    presignedUrlExpireIn: number; // in s
}

interface MediaModifierAPI {
    maxCalls: 100;
}
interface Config {
    s3: S3Config;
    mediaModifier: MediaModifierAPI;
}

const GlobalConfig: Config = {
    s3: {
        bucket: "campusflavor",
        region: "us-east-2",
        presignedUrlExpireIn: 60 * 60, // 1 hour
    },
    mediaModifier: {
        maxCalls: 100,
    },
};

export default GlobalConfig;
