const sendEmail = async (to, subject, text, html) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "DECIBEL Audio",
        email: process.env.BREVO_SENDER,
      },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Brevo API error: ${JSON.stringify(error)}`);
  }
};

// Verification email
export const sendVerificationEmail = async (email, otp) => {
  try {
    await sendEmail(
      email,
      "Verify Your DECIBEL Account",
      `Welcome to DECIBEL!\n\nYour email verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't create a DECIBEL account, please ignore this email.`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #111827;">Welcome to DECIBEL!</h2>
          <p style="color: #4b5563; font-size: 16px;">We're thrilled to have you. To start shopping for premium audio gear, please verify your email address using the code below:</p>
          <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <h1 style="font-size: 32px; letter-spacing: 8px; color: #4f46e5; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in 10 minutes.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    );
  } catch (err) {
    console.error("Verification Email Error:", err);
    throw err;
  }
};

// Password Reset email
export const sendPasswordResetEmail = async (email, otp) => {
  try {
    await sendEmail(
      email,
      "Reset Your DECIBEL Password",
      `Password Reset Request\n\nYour password reset code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request a password reset, you can safely ignore this email.`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #111827;">Password Reset Request</h2>
          <p style="color: #4b5563; font-size: 16px;">We received a request to reset the password for your DECIBEL account. Use the code below to proceed:</p>
          <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <h1 style="font-size: 32px; letter-spacing: 8px; color: #dc2626; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in <strong>10 minutes</strong>.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `
    );
  } catch (err) {
    console.error("Password Reset Email Error:", err);
    throw err;
  }
};