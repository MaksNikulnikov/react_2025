import { useEffect, useState } from "react";
import { DemoLatencyContext } from "./demoLatencyContext";
import {
  DEMO_LATENCY_MS,
  getDemoLatencyEnabled,
  setDemoLatencyEnabled,
} from "../../config/demo-latency";

export const DemoLatencyContextProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(getDemoLatencyEnabled);

  useEffect(() => {
    setDemoLatencyEnabled(isEnabled);
  }, [isEnabled]);

  const toggleLatency = () => {
    setIsEnabled((currentValue) => !currentValue);
  };

  return (
    <DemoLatencyContext
      value={{
        isEnabled,
        delayMs: isEnabled ? DEMO_LATENCY_MS : 0,
        toggleLatency,
      }}
    >
      {children}
    </DemoLatencyContext>
  );
};
