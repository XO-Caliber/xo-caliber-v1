import { EmailReactProps, EmailTextProps } from "@/types/emailProps";
import { resend } from "./resend";
import { VerifyEmailTemplate } from "@/components/Emails/VerifyEmail";
import { ResetPasswordEmail } from "@/components/Emails/ResetPasswordEmail";

export async function sendPasswordResetRequest(userEmail: string, token: string) {
  try {
    const data = await resend.emails.send({
      from: "Admin <rohnu@extrao1.com>",
      to: [userEmail],
      subject: `Log in to... `,
      //   text: text({ token, host }),
      react: ResetPasswordEmail(token)
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
