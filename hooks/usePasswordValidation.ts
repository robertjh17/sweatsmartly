import { useMemo } from "react";

export function usePasswordValidation(password: string | undefined) {
  const checks = useMemo(() => {
    return [
      { label: "Minimaal 12 tekens", isValid: (password?.length ?? 0) >= 12 },
      { label: "Minimaal één hoofdletter", isValid: /[A-Z]/.test(password ?? "") },
      { label: "Minimaal één kleine letter", isValid: /[a-z]/.test(password ?? "") },
      { label: "Minimaal één cijfer", isValid: /[0-9]/.test(password ?? "") },
      { label: "Minimaal één speciaal teken", isValid: /[!@#$%^&*(),.?\":{}|<>]/.test(password ?? "") },
    ];
  }, [password]);

  const allValid = checks.every((c) => c.isValid);

  return { checks, allValid };
}
