import { useContext } from "react";
import { DemoLatencyContext } from "./demoLatencyContext";

export const useDemoLatency = () => useContext(DemoLatencyContext);
