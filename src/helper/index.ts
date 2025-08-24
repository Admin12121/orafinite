"use server";

import { headers } from "next/headers";
export interface RequestMeta {
  ip?: string;
  ua?: string;
  os?: string;
  client?: string;
  country?: string;
  city?: string;
}

export async function getRequestMeta(): Promise<RequestMeta> {
  if ((globalThis as any).EdgeRuntime) return {};

  const h = await headers();
  const ua = h.get("user-agent") || undefined;
  const ip =
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    h.get("x-real-ip") ||
    undefined;

  let os: string | undefined;
  let client: string | undefined;
  if (ua) {
    const { UAParser } = await import("ua-parser-js");
    const parser = new UAParser(ua);
    const parsed = parser.getResult();
    os = [parsed.os.name, parsed.os.version].filter(Boolean).join(" ");
    client = [parsed.browser.name, parsed.browser.version]
      .filter(Boolean)
      .join(" ");
  }

  const country = h.get("x-vercel-ip-country") || undefined;
  const city = h.get("x-vercel-ip-city") || undefined;
  
  return { ip, ua, os, client, country, city };
}
