import { describe, expect, it } from "vitest";
import { CAL_LINK, CAL_URL } from "./i18n";

describe("booking link", () => {
  it("points at the clinic's Cal.com event", () => {
    expect(CAL_LINK).toBe("dr-iyad-eye-clinic/driyadclinic-eye-appointment");
    expect(CAL_URL).toBe("https://cal.com/dr-iyad-eye-clinic/driyadclinic-eye-appointment");
  });
});
