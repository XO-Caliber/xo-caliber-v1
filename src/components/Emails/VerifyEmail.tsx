import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.PRODUCTION_URL;

export const VerifyEmailTemplate = (email: string, token: string) => (
  <Html>
    <Head />
    <Preview>The sales intelligence platform that helps you uncover qualified leads.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://i.postimg.cc/RVMWjVnT/Main-logo-500x-100.jpg"
          width="170"
          alt="XO caliber"
          style={logo}
        />
        <Text style={paragraph}>Hey,</Text>
        <Text style={paragraph}>
          Welcome to XO Caliber, Please verify your Email {email} by pressing this button
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/verify-email?token=${token}`}>
            Verify Email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The XO Caliber team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Address here | Token will expire once used</Text>
      </Container>
    </Body>
  </Html>
);

export default VerifyEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px"
};

const logo = {
  margin: "0 auto"
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px"
};

const btnContainer = {
  textAlign: "center" as const
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px"
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0"
};

const footer = {
  color: "#8898aa",
  fontSize: "12px"
};
