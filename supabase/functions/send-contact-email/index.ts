import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const allowedOrigins = [
  "https://mrpropertytr.com",
  "https://www.mrpropertytr.com",
  "https://mrproperty.lovable.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".lovable.app");
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return text.replace(/[&<>"'\/]/g, (m) => map[m]);
}

function validateInput(body: unknown): { name: string; email: string; phone?: string; message: string } | null {
  if (!body || typeof body !== "object") return null;
  const { name, email, phone, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) return null;
  if (typeof email !== "string" || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (phone !== undefined && phone !== null && (typeof phone !== "string" || phone.length > 20)) return null;
  if (typeof message !== "string" || message.trim().length === 0 || message.length > 1000) return null;

  return {
    name: name.trim(),
    email: email.trim(),
    phone: typeof phone === "string" ? phone.trim() : undefined,
    message: message.trim(),
  };
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const validated = validateInput(rawBody);

    if (!validated) {
      return new Response(
        JSON.stringify({ error: "Invalid input. Please check your submission." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, message } = validated;

    console.log("Sending contact email notification for:", name);

    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MR. Property <noreply@mrpropertytr.com>",
        to: ["info@mrpropertytr.com"],
        subject: `New Contact Form Submission from ${escapeHtml(name)}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <h2>Message:</h2>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.text();
      console.error("Failed to send admin email:", errorData);
      throw new Error("Email delivery failed");
    }

    console.log("Admin notification email sent successfully");

    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MR. Property <noreply@mrpropertytr.com>",
        to: [email],
        subject: "Thank you for contacting MR. Property",
        html: `
          <h1>Thank you for contacting us, ${escapeHtml(name)}!</h1>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The MR. Property Team</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorData = await userEmailResponse.text();
      console.error("Failed to send user confirmation email:", errorData);
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
};

serve(handler);
