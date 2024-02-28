import * as React from "react";

import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface VerificationCodeEmailProps {
    userName: string;
    verificationCode: string;
    verificationUrl: string;
    websiteUrl: string;
}
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const VerificationCodeEmail = ({
    verificationUrl,
    websiteUrl,
}: VerificationCodeEmailProps) => (
    <Html>
        <Head />
        <Preview>Verify your email</Preview>
        <Tailwind>
            <Body className="bg-white font-sans">
                <Container className="mx-auto py-5 px-0 max-w-xl flex flex-col">
                    <Img
                        src={`https://www.campusflavor.com/logos/logo_main_no_bg.svg`}
                        width="150"
                        alt="Campus Flavor"
                    />
                    <Heading className="text-2xl leading-8 font-bold text-gray-800 pt-4 -tracking-tighter">
                        Verify your email
                    </Heading>
                    <Text className="mb-4 text-base leading-normal text-gray-900">
                        Thank you for signing up to Campus Flavor. To complete
                        registration please verify your email.
                    </Text>
                    <Section className="py-3 flex flex-row items-center justify-center w-full">
                        <Button
                            className="bg-black rounded text-white font-semibold text-base no-underline text-center block px-5 py-2"
                            href={verificationUrl}
                        >
                            Verify
                        </Button>
                    </Section>
                    <Text className="mb-4 text-base leading-normal text-gray-900">
                        If the button does not work, you can copy and paste this
                        link into your browser directly.
                    </Text>
                    <Section className="py-3 flex flex-row items-center justify-center w-full">
                        <code className="font-mono font-bold bg-gray-200 text-lg rounded text-gray-900 p-1">
                            {verificationUrl}
                        </code>
                    </Section>
                    <Hr className="border-gray-300 my-10" />
                    <Link href={websiteUrl} className="text-sm text-gray-400">
                        Campus Flavor
                    </Link>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

VerificationCodeEmail.PreviewProps = {
    verificationUrl: "http://localhost:3001/preview/verification-email",
    websiteUrl: "hello",
} as VerificationCodeEmailProps;

export default VerificationCodeEmail;
