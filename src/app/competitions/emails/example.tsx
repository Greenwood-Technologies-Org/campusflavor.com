import * as React from "react";

import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface ExampleEmailProps {}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export default function ExampleEmail({}: ExampleEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Example Email</Preview>
            <Body className=""></Body>
        </Html>
    );
}
