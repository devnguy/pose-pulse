import { vi, describe, it } from "vitest";

// Leaving this here as a note:
// Disables a package that checks that code is only executed on the server side.
// Also, this mock can be defined in the Vitest setup file.
// Test functions that import server-only
vi.mock("server-only", () => {
  return {};
});

describe("formatDistanceToNowShort", () => {
  it("abbreviates years", () => {});

  it("abbreviates months", () => {});

  it("abbreviates days", () => {});

  it("abbreviates hours", () => {});

  it("abbreviates minutes", () => {});
});
