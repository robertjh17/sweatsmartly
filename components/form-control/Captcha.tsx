// components/form/Captcha.tsx
"use client";


import { useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
  onChange: (token: string | null) => void;
}

export default function Captcha({ onChange }: CaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    const recaptcha = recaptchaRef.current;
    return () => {
      recaptcha?.reset();
    };
  }, []);

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      onChange={onChange}
      theme="light"
    />
  );
}
