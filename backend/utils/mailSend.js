import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendResetOtp = async (otp, recipientEmail) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Your email (set in .env file)
        pass: process.env.EMAIL_PASS, // App password (set in .env file)
      },
    });

    // Email content
    const mailOptions = {
      from: `"JOB PORTAL - Support Team" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Password Reset Request ",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #333; font-size: 2.5em;">Password Reset Request</h1>
          <p>Dear User,</p>
          <p>We have received a request to reset the password for your account on <strong>Job Portal</strong>. Please use the One-Time Password (OTP) provided below to proceed with the reset process:</p>
          <div style="margin: 20px 0; padding: 20px; border: 2px dashed #0056b3; background-color: #f9f9f9; text-align: center;">
            <h1 style="color: #0056b3; font-size: 3em;letter-spacing: 5px; margin: 0;">${otp}</h1>
            
          </div>
          <p><strong>Note:</strong> This OTP will expire in 48 seconds. If you did not initiate this request, please disregard this email or contact our support team immediately for assistance.</p>
          <p>Best regards,<br>The Job Portal Support Team</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email", error };
  }
};
