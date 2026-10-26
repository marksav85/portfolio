'use client';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { contactLimits, validateContact } from '@/lib/contact';
import type { ContactErrors } from '@/lib/contact';
import { messages } from '@/lib/locale';
import type { PortfolioLocale } from '@/types/portfolio';
export function ContactForm({ locale }: { locale: PortfolioLocale }) {
  const m = messages[locale];
  const busy = useRef(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent' | 'failed' | 'limited'>('idle');
  const [errors, setErrors] = useState<ContactErrors>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      message: String(data.get('message') || ''),
    };
    const checked = validateContact(payload);
    setErrors(checked.errors);
    setStatus('idle');
    const first = Object.keys(checked.errors)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    busy.current = true;
    setPending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ ...checked.values, honeypot: String(data.get('honeypot') || '') }),
      });
      if (response.status === 429) {
        setStatus('limited');
        return;
      }
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('unavailable');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('failed');
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  function field(key: 'name' | 'email' | 'message') {
    const props = {
      id: `contact-${key}`,
      name: key,
      required: true,
      maxLength: contactLimits[key],
      'aria-invalid': Boolean(errors[key]),
      'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    };
    return (
      <label htmlFor={props.id}>
        {m[key]}
        {key === 'message' ? (
          <textarea {...props} rows={5} />
        ) : (
          <input {...props} type={key === 'email' ? 'email' : 'text'} autoComplete={key} />
        )}
        {errors[key] && (
          <span id={`contact-${key}-error`}>
            {errors[key] === 'invalid' && key === 'email' ? m.invalidEmail : m[errors[key]]}
          </span>
        )}
      </label>
    );
  }
  return (
    <form
      className="contact-form panel"
      noValidate
      aria-describedby="form-notice"
      aria-busy={pending}
      onSubmit={submit}
    >
      <div className="form-row">
        {field('name')}
        {field('email')}
      </div>
      {field('message')}
      <div hidden aria-hidden="true">
        <label htmlFor="contact-trap">
          Leave empty
          <input id="contact-trap" name="honeypot" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="button" type="submit" disabled={pending}>
        {pending ? m.sending : status === 'failed' || status === 'limited' ? m.retry : m.send}
      </button>
      <p id="form-notice" className="muted">
        {m.formNotice}
      </p>
      <p role="status" aria-live="polite">
        {pending
          ? m.sending
          : status === 'sent'
            ? m.sent
            : status === 'limited'
              ? m.rateLimited
              : status === 'failed'
                ? m.sendFailed
                : ''}
      </p>
    </form>
  );
}
