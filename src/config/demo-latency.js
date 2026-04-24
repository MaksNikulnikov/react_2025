const STORAGE_KEY = "restaurant-explorer-demo-latency";

export const DEMO_LATENCY_MS = 1000;

export const getDemoLatencyEnabled = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (storedValue === "off") {
    return false;
  }

  if (storedValue === "on") {
    return true;
  }

  return true;
};

export const setDemoLatencyEnabled = (enabled) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
};

export const getDemoLatencyMs = () =>
  getDemoLatencyEnabled() ? DEMO_LATENCY_MS : 0;
