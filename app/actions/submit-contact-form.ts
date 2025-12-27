"use server";

import nodemailer from 'nodemailer';

// Define the recipient email address
const RECIPIENT_EMAIL = "binitegga2019@gmail.com";

export async function submitContactForm(formData: FormData) {
  console.log("🚀 Starting contact form submission...");

  try {
    // 1. Validate Environment Variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("❌ CRITICAL ERROR: Missing Gmail credentials in environment variables.");
      console.error("GMAIL_USER status:", process.env.GMAIL_USER ? "Defined" : "Undefined");
      console.error("GMAIL_PASS status:", process.env.GMAIL_PASS ? "Defined" : "Undefined");
      return {
        success: false,
        error: "Server configuration error: Email credentials are missing. Please check .env.local"
      };
    }

    // Check if password might be a regular password instead of an App Password
    if (process.env.GMAIL_PASS.length < 16) {
      console.warn("⚠️ WARNING: GMAIL_PASS looks too short. ensure you are using a Google App Password (16 characters), not your login password.");
    }

    // 2. Extract Data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      return { success: false, error: "Please fill in all fields." };
    }

    console.log(`📧 Preparing to send email from: ${process.env.GMAIL_USER} to: ${RECIPIENT_EMAIL}`);

    // 3. Create Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Built-in service configuration for Gmail
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      debug: true, // Show debug output
    });

    // 4. Verify Connection
    try {
      console.log("🔌 Verifying SMTP connection...");
      await transporter.verify();
      console.log("✅ SMTP Connection Successful");
    } catch (verifyError: any) {
      console.error("❌ SMTP Connection Failed:", verifyError);
      return {
        success: false,
        error: `SMTP Connection Error: ${verifyError.message || 'Unknown error'}. Check your internet connection and App Password.`
      };
    }

    // 5. Send Email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!", info.messageId);

    return {
      success: true,
      message: "Message sent successfully!"
    };

  } catch (error: any) {
    console.error("❌ Fatal Error sending email:", error);
    return {
      success: false,
      error: error.message || "Failed to send message."
    };
  }
}