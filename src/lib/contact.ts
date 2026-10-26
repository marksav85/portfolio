export const contactLimits = { name: 100, email: 254, message: 5000 } as const;
export type ContactValues = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, 'required' | 'invalid' | 'long'>>;
export function validateContact(input: ContactValues) {
  const values = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, value.trim()]),
  ) as ContactValues;
  const errors: ContactErrors = {};
  for (const key of Object.keys(contactLimits) as (keyof ContactValues)[]) {
    if (!values[key]) errors[key] = 'required';
    else if (input[key].length > contactLimits[key]) errors[key] = 'long';
    else if (/\p{Cc}/u.test(values[key].replace(key === 'message' ? /[\n\r\t]/g : /$^/g, '')))
      errors[key] = 'invalid';
  }
  if (
    values.email &&
    !/^[^\s<>(),;:"\\@]+@[^\s<>(),;:"\\@]+\.[^\s<>(),;:"\\@]+$/.test(values.email)
  )
    errors.email = 'invalid';
  return { values, errors };
}
