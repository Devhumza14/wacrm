import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/safe-next";

// Landing point for Supabase email links (password reset). Trades the
// one-time PKCE `code` for a session cookie, then continues to `next`.
// Location is kept relative so the redirect stays on whatever host the
// browser used, even behind Hostinger's proxy.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect(next);
    console.warn("[auth/callback] code exchange failed:", error.message);
  }

  return redirect("/forgot-password?error=link_invalid");
}

function redirect(location: string) {
  return new NextResponse(null, { status: 307, headers: { Location: location } });
}
