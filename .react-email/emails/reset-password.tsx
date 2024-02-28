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

interface ResetPasswordEmailProps {
    websiteUrl: string;
    verificationUrl: string;
}
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const ResetPasswordEmail = ({
    verificationUrl,
    websiteUrl,
}: ResetPasswordEmailProps) => (
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
                        Reset your password
                    </Heading>
                    <Text className="mb-4 text-base leading-normal text-gray-900">
                        Someone has requested a password reset for the account
                        linked to this email. You can reset your password by
                        following the steps below.
                    </Text>
                    <Text className="mb-4 text-base leading-normal font-semibold text-gray-900">
                        If you didn't request a password reset, you can safely
                        ignore this email.
                    </Text>
                    <Section className="py-3 flex flex-row items-center justify-center w-full">
                        <Button
                            className="bg-black rounded text-white font-semibold text-base no-underline text-center block px-5 py-2"
                            href={verificationUrl}
                        >
                            Reset Password
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

ResetPasswordEmail.PreviewProps = {
    verificationUrl: "http://localhost:3001/preview/verification-email",
    websiteUrl: "hello",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
