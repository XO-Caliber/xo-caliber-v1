import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const ResetPasswordEmail = (token: string) => (
  <Html>
    <Head />
    <Preview>We recieved a request to reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://i.postimg.cc/Ls2FCWvJ/LOGO-Trans.png" width="80" alt="Dropbox" />
        <Section>
          <Text style={text}>Hey,</Text>
          <Text style={text}>
            Someone recently requested a password change for your XO Caliber account. If this was
            you, you can set a new password here:
          </Text>
          <Button style={button} href={`${baseUrl}/reset-password?token=${token}`}>
            Reset password
          </Button>
          <Text style={text}>
            If you don&apos;t want to change your password or didn&apos;t request this, just ignore
            and delete this message.
          </Text>

          <Text style={text}>Happy Day!</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0"
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px"
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px"
};

const button = {
  backgroundColor: "#FFC0B1",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px"
};

const anchor = {
  textDecoration: "underline"
};
