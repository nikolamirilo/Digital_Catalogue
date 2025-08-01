import { Container, Heading, Text, Link } from "@react-email/components";

function InformationEmail({ email, name, message, subject }: { email: string; name: string; message: string; subject: string }) {
    return (
        <Container
            style={{
                backgroundColor: "#ffffff", // Clean white background
                fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
                padding: "0",
                borderRadius: "24px",
                maxWidth: "600px",
                margin: "20px auto",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08)",
                border: "1px solid #f3f4f6",
                overflow: "hidden",
            }}
        >
            {/* Header Section */}
            <div
                style={{
                    background: "linear-gradient(135deg, #111827 0%, #000000 100%)",
                    padding: "40px 32px",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                {/* Decorative elements */}
                <div
                    style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-20px",
                        width: "80px",
                        height: "80px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-10px",
                        left: "-10px",
                        width: "40px",
                        height: "40px",
                        background: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "50%",
                    }}
                />
                
                <Heading
                    style={{
                        fontSize: "32px",
                        marginBottom: "8px",
                        color: "#ffffff",
                        textAlign: "center",
                        fontWeight: "700",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.2",
                        position: "relative",
                        zIndex: "1",
                    }}
                >
                    New Contact Message
                </Heading>
                <Text
                    style={{
                        fontSize: "16px",
                        color: "#d1d5db",
                        textAlign: "center",
                        margin: "0",
                        position: "relative",
                        zIndex: "1",
                    }}
                >
                    You have received a new message from your website
                </Text>
            </div>

            {/* Content Section */}
            <div style={{ padding: "40px 32px" }}>
                {/* Contact Info Cards */}
                <div style={{ marginBottom: "32px" }}>
                    <div
                        style={{
                            backgroundColor: "#f9fafb",
                            border: "2px solid #f3f4f6",
                            borderRadius: "16px",
                            padding: "24px",
                            marginBottom: "16px",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                textTransform: "uppercase",
                                fontWeight: "600",
                                letterSpacing: "0.05em",
                                margin: "0 0 8px 0",
                            }}
                        >
                            From
                        </Text>
                        <Text
                            style={{
                                fontSize: "20px",
                                color: "#111827",
                                fontWeight: "600",
                                margin: "0",
                                lineHeight: "1.4",
                            }}
                        >
                            {name}
                        </Text>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#f9fafb",
                            border: "2px solid #f3f4f6",
                            borderRadius: "16px",
                            padding: "24px",
                            marginBottom: "16px",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                textTransform: "uppercase",
                                fontWeight: "600",
                                letterSpacing: "0.05em",
                                margin: "0 0 8px 0",
                            }}
                        >
                            Email Address
                        </Text>
                        <Link
                            href={`mailto:${email}`}
                            style={{
                                fontSize: "18px",
                                color: "#000000",
                                fontWeight: "500",
                                textDecoration: "none",
                                padding: "8px 16px",
                                backgroundColor: "#ffffff",
                                border: "2px solid #e5e7eb",
                                borderRadius: "8px",
                                display: "inline-block",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {email}
                        </Link>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#f9fafb",
                            border: "2px solid #f3f4f6",
                            borderRadius: "16px",
                            padding: "24px",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                textTransform: "uppercase",
                                fontWeight: "600",
                                letterSpacing: "0.05em",
                                margin: "0 0 12px 0",
                            }}
                        >
                            Message
                        </Text>
                        <Text
                            style={{
                                fontSize: "16px",
                                color: "#374151",
                                lineHeight: "1.7",
                                margin: "0",
                                whiteSpace: "pre-wrap",
                                backgroundColor: "#ffffff",
                                padding: "20px",
                                borderRadius: "12px",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            {message}
                        </Text>
                    </div>
                </div>

                {/* Action Button */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <Link
                        href={`mailto:${email}`}
                        style={{
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            padding: "16px 32px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "600",
                            display: "inline-block",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        }}
                    >
                        Reply to {name}
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    backgroundColor: "#f9fafb",
                    padding: "32px",
                    textAlign: "center",
                    borderTop: "1px solid #e5e7eb",
                }}
            >
                <Text
                    style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        margin: "0 0 8px 0",
                        lineHeight: "1.5",
                    }}
                >
                    Visit us at{" "}
                    <Link
                        href="https://www.quicktalog.app"
                        style={{
                            color: "#000000",
                            textDecoration: "none",
                            fontWeight: "600",
                        }}
                    >
                        Quicktalog
                    </Link>
                </Text>
                <Text
                    style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        margin: "0",
                    }}
                >
                    &copy; {new Date().getFullYear()} Quicktalog. All rights reserved.
                </Text>
            </div>
        </Container>
    );
}

export default InformationEmail;