import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "RESEND_API_KEY environment variable is required" });
      }

      const resend = new Resend(apiKey);
      const { name, email, company, inquiryType, message } = req.body;

      if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
      }

      const emailResult = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // Resend test domain sender. For production, the user will need to verify their domain.
        to: ["admin@3volveinnovations.com"],
        subject: `New Inquiry from ${name || "Website Visitor"} - ${inquiryType || "General"}`,
        html: `
          <h3>New Website Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\\n/g, "<br>")}</p>
        `,
      });

      if (emailResult.error) {
        return res.status(400).json({ error: emailResult.error.message });
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Failed to send email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For Express 4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
