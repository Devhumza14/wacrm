import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safe-next";

describe("safeNextPath", () => {
  it("keeps same-app paths", () => {
    expect(safeNextPath("/reset-password")).toBe("/reset-password");
    expect(safeNextPath("/inbox?c=1")).toBe("/inbox?c=1");
  });

  it("falls back for missing, absolute or protocol-relative targets", () => {
    for (const bad of [null, "", "https://evil.com", "//evil.com", "/\\evil.com", "evil.com"]) {
      expect(safeNextPath(bad)).toBe("/dashboard");
    }
  });
});
