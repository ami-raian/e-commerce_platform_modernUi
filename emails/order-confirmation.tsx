import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cartItems: CartItem[];
  subtotal: number;
  promoDiscount: number;
  appliedPromoCode?: string;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentNumber: string;
  orderDate: string;
}

export const OrderConfirmationEmail = ({
  customerName,
  email,
  phone,
  address,
  city,
  cartItems,
  subtotal,
  promoDiscount,
  appliedPromoCode,
  shipping,
  total,
  paymentMethod,
  paymentNumber,
  orderDate,
}: OrderConfirmationEmailProps) => {
  const previewText = `Order confirmation for ${customerName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>🛍️ Order Confirmation</Heading>
            <Text style={subheading}>Thank you for your order!</Text>
          </Section>

          <Section style={section}>
            <Text style={text}>Hi {customerName},</Text>
            <Text style={text}>
              We've received your order and will process it shortly. Here are
              the details:
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order Details */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Order Details
            </Heading>
            <Text style={infoText}>
              <strong>Order Date:</strong> {orderDate}
            </Text>
          </Section>

          {/* Shipping Information */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Shipping Information
            </Heading>
            <Text style={infoText}>
              <strong>Name:</strong> {customerName}
            </Text>
            <Text style={infoText}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={infoText}>
              <strong>Phone:</strong> {phone}
            </Text>
            <Text style={infoText}>
              <strong>Address:</strong> {address}
            </Text>
            <Text style={infoText}>
              <strong>City:</strong> {city}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order Items */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Order Items
            </Heading>
            {cartItems.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemColumn}>
                  <Text style={itemName}>{item.name}</Text>
                  {item.size && (
                    <Text style={itemDetails}>Size: {item.size}</Text>
                  )}
                  <Text style={itemDetails}>
                    Quantity: {item.quantity} × ৳
                    {item.price.toLocaleString("en-BD")}
                  </Text>
                </Column>
                <Column align="right" style={itemColumn}>
                  <Text style={itemPrice}>
                    ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Order Summary */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Order Summary
            </Heading>
            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>Subtotal:</Text>
              </Column>
              <Column align="right">
                <Text style={summaryValue}>
                  ৳{subtotal.toLocaleString("en-BD")}
                </Text>
              </Column>
            </Row>

            {promoDiscount > 0 && (
              <Row style={summaryRow}>
                <Column>
                  <Text style={discountLabel}>
                    Discount {appliedPromoCode ? `(${appliedPromoCode})` : ""}:
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={discountValue}>
                    -৳{promoDiscount.toLocaleString("en-BD")}
                  </Text>
                </Column>
              </Row>
            )}

            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>Shipping:</Text>
              </Column>
              <Column align="right">
                <Text style={summaryValue}>
                  {shipping === 0
                    ? "Free"
                    : `৳${shipping.toLocaleString("en-BD")}`}
                </Text>
              </Column>
            </Row>

            <Hr style={divider} />

            <Row style={summaryRow}>
              <Column>
                <Text style={totalLabel}>Total:</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>৳{total.toLocaleString("en-BD")}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Payment Information */}
          <Section style={section}>
            <Heading as="h2" style={sectionHeading}>
              Payment Instructions
            </Heading>
            <Text style={infoText}>
              <strong>Payment Method:</strong> {paymentMethod}
            </Text>
            <Text style={infoText}>
              <strong>Send Payment To:</strong> {paymentNumber}
            </Text>
            <Text style={infoText}>
              <strong>Amount to Send:</strong> ৳{total.toLocaleString("en-BD")}
            </Text>
            <Section style={paymentInstructions}>
              <Text style={instructionText}>
                Please complete your payment using {paymentMethod} to the number
                above. Once payment is confirmed, we'll process your order
                immediately.
              </Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions about your order, please contact us.
            </Text>
            <Text style={footerText}>Customer Support: 01712-XXXXXX</Text>
            <Text style={footerText}>Thank you for shopping with us! 🎉</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

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

const itemRow = {
  padding: "12px 0",
  borderBottom: "1px solid #e6ebf1",
};

const itemColumn = {
  verticalAlign: "top" as const,
};

const itemName = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#333333",
  margin: "0 0 4px",
};

const itemDetails = {
  fontSize: "12px",
  color: "#666666",
  margin: "0",
};

const itemPrice = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#333333",
  margin: "0",
};

const summaryRow = {
  padding: "8px 0",
};

const summaryLabel = {
  fontSize: "14px",
  color: "#525252",
  margin: "0",
};

const summaryValue = {
  fontSize: "14px",
  color: "#333333",
  fontWeight: "500",
  margin: "0",
};

const discountLabel = {
  fontSize: "14px",
  color: "#16a34a",
  margin: "0",
};

const discountValue = {
  fontSize: "14px",
  color: "#16a34a",
  fontWeight: "600",
  margin: "0",
};

const totalLabel = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
  margin: "0",
};

const totalValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#8B4513",
  margin: "0",
};

const paymentInstructions = {
  backgroundColor: "#f8f9fa",
  padding: "16px",
  borderRadius: "8px",
  marginTop: "12px",
};

const instructionText = {
  fontSize: "14px",
  color: "#525252",
  margin: "0",
  lineHeight: "20px",
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
