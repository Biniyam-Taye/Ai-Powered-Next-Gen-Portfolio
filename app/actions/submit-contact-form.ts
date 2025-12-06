// app/actions/submit-contact-form.ts

"use server";

import nodemailer from 'nodemailer';

// Define the recipient email address
const RECIPIENT_EMAIL = "biniyamtaye04@gmail.com";

// 1. Create a Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // Get credentials from environment variables (set in .env.local)
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function submitContactForm(formData: FormData) {
  try {
    // 2. Extract Data from FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Basic validation (you should add more comprehensive validation)
    if (!name || !email || !subject || !message) {
      return { success: false, error: "Missing required form fields." };
    }

    // 3. Define the Email Content
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address (your Gmail)
      to: RECIPIENT_EMAIL, // Recipient address (your Gmail)
      subject: `[Contact Form] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // 4. Send the Email
    await transporter.sendMail(mailOptions);

    // 5. Success response for the client component
    console.log(`Contact form submitted successfully from ${name}`);
    return { success: true };

  } catch (error) {
    console.error("Error sending email:", error);
    // 6. Error response for the client component
    return { success: false, error: "Failed to send message. Server error." };
  }
}