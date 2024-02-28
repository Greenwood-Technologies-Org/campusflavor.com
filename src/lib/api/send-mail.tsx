import ExampleEmail from "@/components/emails/example";
import { Resend } from "resend";

async function sendEmail() {
    const resendApiKey = process.env.RESEND_NOTIFICATIONS;
    if (!resendApiKey) {
        throw new Error("`RESEND_NOTIFICATIONS` undefined.");
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
        from: "source@campusflavor.com",
        to: ["to@domain.ext"],
        subject: "Example",
        react: <ExampleEmail />,
    });
}

export { sendEmail };
