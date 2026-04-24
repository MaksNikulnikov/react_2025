import { createContext } from "react";

export const DemoLatencyContext = createContext({
  isEnabled: true,
  delayMs: 1000,
  toggleLatency: () => {},
});
