import { EmailReactProps, EmailTextProps } from "@/types/emailProps";
import { resend } from "./resend";
import { MagicLinkEmail } from "@/components/resend/MagicLinkEmail";

export async function sendVerificationRequest(userEmail: string, url: string) {
  //   const { userEmail, url } = params;

  try {
    const data = await resend.emails.send({
      from: "<onboarding@resend.dev>", //! FOR TESTING CHANGE TO DOMAIN NAME
      to: "ametheshlgp@gmail.com", //! FOR TESTING CHANGE TO userEmail
      subject: `Log in to... `,
      //   text: text({ url, host }),
      react: MagicLinkEmail(url)
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send email");
  }
}

// function text({ url, host }: EmailTextProps) {
//   return `Sign in to ${host} \n ${url}\n\n`;
// }
