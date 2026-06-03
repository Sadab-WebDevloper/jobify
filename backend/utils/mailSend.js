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

export const sendNewsletterNotification = async (subscriberEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Jobify - Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🔔 New Newsletter Subscriber!",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
          <div style="background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); padding: 30px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">🎉 New Subscriber!</h1>
          </div>
          <div style="padding: 32px 24px;">
            <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">A new user has subscribed to the <strong style="color: #14b8a6;">Jobify Newsletter</strong>:</p>
            <div style="background: #0f172a; border: 1px dashed #14b8a6; border-radius: 12px; padding: 20px; text-align: center; margin: 0 0 24px;">
              <p style="color: #14b8a6; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 1px;">📧 ${subscriberEmail}</p>
            </div>
            <p style="color: #64748b; font-size: 13px; margin: 0;">Subscribed on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Newsletter notification sent:", info);
    return { success: true, message: "Notification sent" };
  } catch (error) {
    console.error("Error sending newsletter notification:", error);
    return { success: false, message: "Error sending notification", error };
  }
};

export const sendSubscriberWelcome = async (subscriberEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Jobify" <${process.env.EMAIL_USER}>`,
      to: subscriberEmail,
      subject: "Welcome to Jobify Newsletter! 🚀",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
          <div style="background: linear-gradient(135deg, #431692 0%, #6d28d9 100%); padding: 40px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0 0 8px; font-size: 28px; font-weight: 800;">Job<span style="color: #14b8a6;">ify</span></h1>
            <p style="color: #c4b5fd; font-size: 14px; margin: 0;">Your Career Journey Starts Here</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #f1f5f9; font-size: 22px; margin: 0 0 16px;">Welcome aboard! 🎉</h2>
            <p style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">Thank you for subscribing to the <strong style="color: #14b8a6;">Jobify Newsletter</strong>! You'll now receive:</p>
            <div style="margin: 0 0 24px;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="color: #14b8a6; font-size: 18px; margin-right: 12px;">✅</span>
                <span style="color: #e2e8f0; font-size: 14px;">Latest job openings tailored for you</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="color: #14b8a6; font-size: 18px; margin-right: 12px;">✅</span>
                <span style="color: #e2e8f0; font-size: 14px;">Career tips and industry insights</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="color: #14b8a6; font-size: 18px; margin-right: 12px;">✅</span>
                <span style="color: #e2e8f0; font-size: 14px;">Exclusive hiring updates from top companies</span>
              </div>
            </div>
            <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 24px 0 0; border-top: 1px solid #334155; padding-top: 20px;">Made with ❤️ by the <strong style="color: #f1f5f9;">Jobify</strong> team</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info);
    return { success: true, message: "Welcome email sent" };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, message: "Error sending welcome email", error };
  }
};
