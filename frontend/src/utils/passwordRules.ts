export const passwordRules = {
  minLength: (value: string) => value.length >= 6,
  hasUppercase: (value: string) => /[A-Z]/.test(value),
  hasNumber: (value: string) => /\d/.test(value),
};
