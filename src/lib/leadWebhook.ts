// Sends a lead payload to the shared n8n workflow webhook.
// All public-facing forms should call this so leads land in the same automation.
export const LEAD_WEBHOOK_URL =
  "https://n8n.srv1186304.hstgr.cloud/webhook/lead-intake";

// Capture UTM params on first load and persist for later form submissions
if (typeof window !== "undefined") {
  try {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const existing = JSON.parse(sessionStorage.getItem("utm_params") || "{}");
    const next = { ...existing };
    let changed = false;
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) {
        next[k] = v;
        changed = true;
      }
    });
    if (changed) sessionStorage.setItem("utm_params", JSON.stringify(next));
  } catch {
    // ignore
  }
}

export type LeadPayload = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source: string;
  [key: string]: unknown;
};

export async function triggerLeadWebhook(payload: LeadPayload): Promise<void> {
  try {
    const name = (payload.name ?? "").toString().trim();
    const parts = name.split(/\s+/).filter(Boolean);
    const firstName = parts.shift() ?? "";
    const lastName = parts.join(" ");
    const phone = (payload.phone ?? "").toString();
    const normalizedPhone = phone.replace(/[^\d+]/g, "");
    const kvkk = payload.kvkkConsent === true;
    const nowIso = new Date().toISOString();

    // Capture UTM parameters and referrer from the browser
    let utmSource = "";
    let utmMedium = "";
    let utmCampaign = "";
    let utmTerm = "";
    let utmContent = "";
    let pageUrl = "";
    let referrer = "";
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const stored = (() => {
          try {
            return JSON.parse(sessionStorage.getItem("utm_params") || "{}");
          } catch {
            return {};
          }
        })();
        utmSource = params.get("utm_source") || stored.utm_source || "";
        utmMedium = params.get("utm_medium") || stored.utm_medium || "";
        utmCampaign = params.get("utm_campaign") || stored.utm_campaign || "";
        utmTerm = params.get("utm_term") || stored.utm_term || "";
        utmContent = params.get("utm_content") || stored.utm_content || "";
        pageUrl = window.location.href;
        referrer = document.referrer || "";
      } catch {
        // ignore
      }
    }

    const email = (payload.email ?? "").toString().trim();
    const budgetDropdown = (payload.budgetLabel ?? payload.budget ?? "").toString();

    await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        // camelCase (kept for compatibility)
        name,
        firstName,
        lastName,
        email,
        phone,
        normalizedPhone,
        message: payload.message ?? "",
        budgetDropdown,
        initialTier: budgetDropdown,
        kvkkConsent: kvkk,
        kvkkConsentDate: kvkk ? nowIso : null,
        submittedAt: nowIso,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        pageUrl,
        referrer,
        // snake_case (matches the n8n Normalize Lead Payload node)
        first_name: firstName,
        last_name: lastName,
        lead_source: payload.source,
        channel_id: email,
        budget: payload.budget ?? "",
        budget_dropdown: budgetDropdown,
        initial_tier: budgetDropdown,
        kvkk_consent: kvkk,
        kvkk_consent_date: kvkk ? nowIso : null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        page_url: pageUrl,
        submitted_at: nowIso,
      }),
    });
  } catch (err) {
    console.error("Failed to trigger n8n webhook:", err);
  }
}
