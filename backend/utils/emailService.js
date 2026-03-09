import nodemailer from "nodemailer";

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App Password, NOT your Gmail password
  },
});

// Anti-spam: shared mail options base
const baseMailOptions = {
  from: `"DECIBEL Audio" <${process.env.GMAIL_USER}>`,
  headers: {
    "X-Mailer": "DECIBEL Mailer",
    Precedence: "transactional",
  },
};

// Verification email
export const sendVerificationEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      ...baseMailOptions,
      to: email,
      subject: "Verify Your DECIBEL Account",
      // Plain text fallback (critical for spam prevention)
      text: `Welcome to DECIBEL!\n\nYour email verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't create a DECIBEL account, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #111827;">Welcome to DECIBEL!</h2>
          <p style="color: #4b5563; font-size: 16px;">We're thrilled to have you. To start shopping for premium audio gear, please verify your email address using the code below:</p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <h1 style="font-size: 32px; letter-spacing: 8px; color: #4f46e5; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">This code will expire in 10 minutes.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Verification Email Error:", err);
    throw err;
  }
};

// Password Reset email
export const sendPasswordResetEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      ...baseMailOptions,
      to: email,
      subject: "Reset Your DECIBEL Password",
      // Plain text fallback (critical for spam prevention)
      text: `Password Reset Request\n\nYour password reset code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #111827;">Password Reset Request</h2>
          <p style="color: #4b5563; font-size: 16px;">We received a request to reset the password for your DECIBEL account. Use the code below to proceed:</p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <h1 style="font-size: 32px; letter-spacing: 8px; color: #dc2626; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">This code will expire in <strong>10 minutes</strong>.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Password Reset Email Error:", err);
    throw err;
  }
};
