// Only same-app paths may be used as a post-auth redirect target.
// "//evil.com" and "/\evil.com" are protocol-relative to browsers, so
// they're rejected along with absolute URLs.
export function safeNextPath(next: string | null, fallback = "/dashboard"): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return fallback;
  }
  return next;
}
