import { EmailReactProps, EmailTextProps } from "@/types/emailProps";
import { resend } from "./resend";
import { MagicLinkEmail } from "@/components/resend/MagicLinkEmail";
import { VerifyEmailTemplate } from "@/components/resend/VerifyEmail";

export async function sendPasswordResetRequest(userEmail: string, token: string) {
  try {
    const data = await resend.emails.send({
      from: "Admin <rohnu@extrao1.com>",
      to: [userEmail],
      subject: `Log in to... `,
      //   text: text({ token, host }),
      react: MagicLinkEmail(token)
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send email");
  }
}

export async function sendEmailVerificationRequest(userEmail: string, token: string) {
  try {
    const data = await resend.emails.send({
      from: "Admin <rohnu@extrao1.com>",
      to: [userEmail],
      subject: `Log in to... `,
      //   text: text({ url, host }),
      react: VerifyEmailTemplate(userEmail, token)
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send email");
  }
}
