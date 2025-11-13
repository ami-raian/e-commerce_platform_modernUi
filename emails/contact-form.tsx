import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export const ContactFormEmail = ({
  name,
  email,
  subject,
  message,
  submittedAt,
}: ContactFormEmailProps) => {
  const previewText = `New contact message from ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>📧 New Contact Message</Heading>
            <Text style={subheading}>Marqen Contact Form</Text>
          </Section>

          <Section style={section}>
            <Text style={text}>
              You have received a new message from your website contact form.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Contact Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Contact Information
            </Heading>
            <Text style={infoText}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={infoText}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={infoText}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={infoText}>
              <strong>Submitted:</strong> {submittedAt}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Message
            </Heading>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This message was sent from the Marqen contact form.
            </Text>
            <Text style={footerText}>
              Reply directly to {email} to respond to this inquiry.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#8B4513",
  textAlign: "center" as const,
};

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0 0 8px",
};

const subheading = {
  fontSize: "18px",
  color: "#ffffff",
  margin: "0",
};

const section = {
  padding: "24px",
};

const sectionHeading = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "16px",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#525252",
  marginBottom: "16px",
};

const infoText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#525252",
  margin: "4px 0",
};

const divider = {
  borderColor: "#e6ebf1",
  margin: "0",
};

const messageBox = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
  borderLeft: "4px solid #8B4513",
};

const messageText = {
  fontSize: "15px",
  color: "#333333",
  margin: "0",
  lineHeight: "24px",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  padding: "24px",
  textAlign: "center" as const,
  backgroundColor: "#f6f9fc",
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  lineHeight: "16px",
  margin: "4px 0",
};
