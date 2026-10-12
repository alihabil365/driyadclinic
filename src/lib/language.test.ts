import { afterEach, expect, it, vi } from "vitest";
import { readLanguage, saveLanguage } from "./language";

afterEach(() => vi.unstubAllGlobals());

it("keeps the site usable when browser storage is blocked", () => {
  vi.stubGlobal("window", {
    get localStorage() {
      throw new Error("Storage denied");
    },
  });
  expect(readLanguage()).toBe("en");
  expect(() => saveLanguage("ar")).not.toThrow();
});

it("persists the selected language and ignores invalid stored values", () => {
  let value = "invalid";
  vi.stubGlobal("window", {
    localStorage: {
      getItem: () => value,
      setItem: (_key: string, next: string) => {
        value = next;
      },
    },
  });
  expect(readLanguage()).toBe("en");
  saveLanguage("ar");
  expect(readLanguage()).toBe("ar");
});
