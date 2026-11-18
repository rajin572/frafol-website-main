"use client";
import { useCallback, useEffect, useState } from "react";

// A new verification code (OTP) can be requested at most once every 2 minutes. The time of the
// last request is kept in sessionStorage per purpose (this tab only, cleared when the tab is
// closed), so reloading the OTP page does not reset the countdown: it shows the time that is
// really left since the last code was sent.
export const OTP_COOLDOWN_SECONDS = 120;

export type OtpPurpose = "email-verification" | "forget-password";

const storageKey = (purpose: OtpPurpose) => `frafol_otp_sent_at_${purpose}`;

// Same time kept in memory too. Some browsers block site storage (strict privacy settings, some
// private windows, embedded browsers): sessionStorage then throws or is not kept, and the countdown
// used to vanish at once. The sign-up / forgot-password form and the OTP page are one client-side
// navigation, so this copy survives the page change; only a full reload loses it there.
const memorySentAt: Partial<Record<OtpPurpose, number>> = {};

// Call when a code has been sent (sign-up / forgot-password submit, "send again").
export const markOtpSent = (purpose: OtpPurpose) => {
  const now = Date.now();
  memorySentAt[purpose] = now;
  try {
    sessionStorage.setItem(storageKey(purpose), String(now));
  } catch {
    // storage blocked: the in-memory time above is used
  }
};

const sentAtFor = (purpose: OtpPurpose) => {
  let stored = 0;
  try {
    stored = Number(sessionStorage.getItem(storageKey(purpose))) || 0;
  } catch {
    // storage blocked: use the in-memory time only
  }
  return Math.max(stored, memorySentAt[purpose] ?? 0);
};

const secondsLeftFor = (purpose: OtpPurpose) => {
  const left = Math.ceil((sentAtFor(purpose) + OTP_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000);
  // A wrong system clock must not lock the button for longer than the cooldown.
  return Math.min(Math.max(left, 0), OTP_COOLDOWN_SECONDS);
};

// 95 → "1:35"
export const formatCooldown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const useOtpCooldown = (purpose: OtpPurpose) => {
  // 0 on the server and in the first browser render (no sessionStorage there); the effect below
  // reads the real value right after, so server and browser HTML match.
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const tick = () => setSecondsLeft(secondsLeftFor(purpose));
    tick();
    const timer = window.setInterval(tick, 1000);
    // Browsers slow timers down in background tabs; refresh at once when the tab is shown again.
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [purpose]);

  const restart = useCallback(() => {
    markOtpSent(purpose);
    setSecondsLeft(OTP_COOLDOWN_SECONDS);
  }, [purpose]);

  return { secondsLeft, canResend: secondsLeft === 0, restart, label: formatCooldown(secondsLeft) };
};
