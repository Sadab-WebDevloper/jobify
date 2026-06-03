import { sendNewsletterNotification, sendSubscriberWelcome } from "../utils/mailSend.js";
import sendResponse from "../utils/response.util.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return sendResponse(res, 400, null, "Email is required");
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendResponse(res, 400, null, "Please enter a valid email address");
    }

    // Send notification email to admin (the email configured in .env)
    const notificationResult = await sendNewsletterNotification(email);
    if (!notificationResult.success) {
      console.error("Failed to send admin notification:", notificationResult.error);
      return sendResponse(res, 500, null, "Failed to process subscription. Please try again later.");
    }

    // Send welcome/confirmation email to the subscriber
    const welcomeResult = await sendSubscriberWelcome(email);
    if (!welcomeResult.success) {
      console.error("Failed to send welcome email:", welcomeResult.error);
      // Don't fail the request — admin was already notified
    }

    return sendResponse(res, 200, null, "🎉 You've been subscribed successfully! Check your inbox.");
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};
