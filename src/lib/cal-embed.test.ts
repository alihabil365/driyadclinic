import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountCalEmbed } from "./cal-embed";

describe("calendar lifecycle", () => {
  const callbacks = new Map<string, () => void>();
  let api: ReturnType<typeof vi.fn>;
  const element = { innerHTML: "", replaceChildren: vi.fn() };
  const mountNode = { style: {}, remove: vi.fn() };

  beforeEach(() => {
    vi.useFakeTimers();
    callbacks.clear();
    element.replaceChildren.mockClear();
    mountNode.remove.mockClear();
    api = vi.fn((command, options) => {
      if (command === "on") callbacks.set(options.action, options.callback);
      if (command === "off") callbacks.delete(options.action);
    });
    vi.stubGlobal("window", {
      Cal: Object.assign(vi.fn(), { ns: { booking: api } }),
      setTimeout,
      clearTimeout,
    });
    vi.stubGlobal("document", { getElementById: () => element, createElement: () => mountNode });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("recovers if the calendar is ready after the timeout", () => {
    const onReady = vi.fn();
    const onError = vi.fn();
    const cleanup = mountCalEmbed({ elementId: "calendar", onReady, onError });
    vi.advanceTimersByTime(12000);
    expect(onError).toHaveBeenCalledOnce();
    callbacks.get("linkReady")!();
    expect(onReady).toHaveBeenCalledOnce();
    callbacks.get("linkReady")!();
    expect(onReady).toHaveBeenCalledOnce();
    cleanup();
  });

  it("registers listeners before inline initialization and removes them on cleanup", () => {
    const onReady = vi.fn();
    const onError = vi.fn();
    const cleanup = mountCalEmbed({ elementId: "calendar", onReady, onError });
    expect(api.mock.calls.slice(0, 3).map(([command]) => command)).toEqual(["on", "on", "inline"]);
    const oldCallback = callbacks.get("linkReady")!;
    cleanup();
    oldCallback();
    vi.advanceTimersByTime(12000);
    expect(onReady).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(callbacks.size).toBe(0);
    expect(element.replaceChildren).toHaveBeenCalledOnce();
    expect(mountNode.remove).toHaveBeenCalledOnce();
  });
});
