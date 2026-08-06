import { createContext, useContext } from "react";
import type { LandingContext as LandingContextType } from "./types";

const LandingCtx = createContext<LandingContextType | null>(null);

export const LandingProvider = LandingCtx.Provider;

export function useLanding(): LandingContextType {
  const ctx = useContext(LandingCtx);
  if (!ctx) throw new Error("useLanding must be used within LandingProvider");
  return ctx;
}
