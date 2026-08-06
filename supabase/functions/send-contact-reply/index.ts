import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
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

interface RequestBody {
  submissionId: string;
  reply: string;
}

function validateBody(body: unknown): RequestBody | null {
  if (!body || typeof body !== "object") return null;
  const { submissionId, reply } = body as Record<string, unknown>;
  if (typeof submissionId !== "string" || !submissionId.trim()) return null;
  if (typeof reply !== "string" || reply.trim().length === 0 || reply.length > 5000) return null;
  return { submissionId: submissionId.trim(), reply: reply.trim() };
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --- AuthN: require a valid user JWT ---
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.toLowerCase().startsWith("bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized." }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const token = authHeader.slice(7).trim();

    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized." }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --- AuthZ: require admin role ---
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (roleError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: "Forbidden." }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rawBody = await req.json();
    const validated = validateBody(rawBody);

    if (!validated) {
      return new Response(
        JSON.stringify({ error: "Invalid input." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { submissionId, reply } = validated;


    const { data: submission, error: fetchError } = await supabaseAdmin
      .from("contact_submissions")
      .select("name, email")
      .eq("id", submissionId)
      .single();

    if (fetchError || !submission) {
      return new Response(
        JSON.stringify({ error: "Submission not found." }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MR. Property <noreply@mrpropertytr.com>",
        to: [submission.email],
        subject: "Re: Your Inquiry to MR. Property",
        html: `
          <p>Hello ${escapeHtml(submission.name)},</p>
          <p>Thank you for reaching out to MR. Property. Here is our response to your inquiry:</p>
          <hr />
          <p>${escapeHtml(reply).replace(/\n/g, "<br>")}</p>
          <hr />
          <p>Best regards,<br>The MR. Property Team</p>
          <p><small>This is an automated response. Please do not reply to this email.</small></p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Failed to send reply email:", errorData);
      throw new Error("Email delivery failed");
    }

    const { error: updateError } = await supabaseAdmin
      .from("contact_submissions")
      .update({ reply, replied_at: new Date().toISOString(), status: "resolved" })
      .eq("id", submissionId);

    if (updateError) {
      console.error("Failed to update submission:", updateError);
      throw new Error("Database update failed");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-reply function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send reply. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
