"use client";
import { useCallback, useEffect, useState } from "react";

// A new verification code (OTP) can be requested at most once every 2 minutes. The time of the
// last request is kept in sessionStorage per purpose (this tab only, cleared when the tab is
// closed), so reloading the OTP page does not reset the countdown: it shows the time that is
// really left since the last code was sent.
export const OTP_COOLDOWN_SECONDS = 120;

export type OtpPurpose = "email-verification" | "forget-password";

const storageKey = (purpose: OtpPurpose) => `frafol_otp_sent_at_${purpose}`;

// Call when a code has been sent (sign-up / forgot-password submit, "send again").
export const markOtpSent = (purpose: OtpPurpose) => {
  try {
    sessionStorage.setItem(storageKey(purpose), String(Date.now()));
  } catch {
    // storage blocked (private mode): the countdown just starts from this page's state
  }
};

const secondsLeftFor = (purpose: OtpPurpose) => {
  let sentAt = 0;
  try {
    sentAt = Number(sessionStorage.getItem(storageKey(purpose))) || 0;
  } catch {
    return 0;
  }
  const left = Math.ceil((sentAt + OTP_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000);
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
    return () => window.clearInterval(timer);
  }, [purpose]);

  const restart = useCallback(() => {
    markOtpSent(purpose);
    setSecondsLeft(OTP_COOLDOWN_SECONDS);
  }, [purpose]);

  return { secondsLeft, canResend: secondsLeft === 0, restart, label: formatCooldown(secondsLeft) };
};
