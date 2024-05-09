import { resend } from "./resend";
import { VerifyEmailTemplate } from "@/components/Emails/VerifyEmail";
import { ResetPasswordEmail } from "@/components/Emails/ResetPasswordEmail";

export async function sendPasswordResetRequest(userEmail: string, token: string) {
  try {
    const data = await resend.emails.send({
      from: `XO Caliber <${process.env.RESEND_EMAIL}>`,
      to: [userEmail],
      subject: `Request to reset password`,
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
      from: `XO Caliber <${process.env.RESEND_EMAIL}>`,
      to: [userEmail],
      subject: `Verify your XO Caliber email request`,
      //   text: text({ url, host }),
      react: VerifyEmailTemplate(userEmail, token)
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send email");
  }
}
