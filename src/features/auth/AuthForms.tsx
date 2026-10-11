// Bagian: Form Login dan Registrasi
// Tugas: bingkai tampilan bersama (AuthFormFrame), LoginForm, dan RegisterForm.
// Bukan tugas file ini: tata letak kartu dan animasi geser (itu AuthLayout) atau pemanggilan backend (itu api.ts).

import type { FormEvent, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { PasswordInput, TextField } from '../../components/ui/TextField';
import { login, register } from './api';
import { isValidEmail, MIN_PASSWORD_LENGTH, useAuthForm, type FormErrors } from './useAuthForm';

// ---------- Bingkai Login (spacious dengan logo) ----------
function LoginFormFrame({
  title,
  subtitle,
  submitLabel,
  isSubmitting,
  submitError,
  onSubmit,
  switchText,
  switchLabel,
  switchTo,
  children,
}: {
  title: string;
  subtitle: string;
  submitLabel: string;
  isSubmitting: boolean;
  submitError: string;
  onSubmit: (event: FormEvent) => void;
  switchText: string;
  switchLabel: string;
  switchTo: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col px-6 sm:px-12 py-4 lg:py-5">
      <div className="flex flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden scrollbar-hide py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <img src="/assets/images/logo-login.png" alt="FlexOffice" className="mx-auto mb-4 lg:mb-5 h-11 lg:h-12 w-auto object-contain" />
        <h1 className="text-[28px] font-bold leading-tight text-gray-900">{title}</h1>
        <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>

        <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-3">
          {children}

          {submitError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {submitLabel}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          {switchText}{' '}
          <Link to={switchTo} className="font-semibold text-blue-600 hover:text-blue-700">
            {switchLabel}
          </Link>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
        <span>© {new Date().getFullYear()} FlexOffice Technologies</span>
        <span>Privacy · Terms</span>
      </div>
    </div>
  );
}

// ---------- Bingkai Register (compact tanpa logo) ----------
function RegisterFormFrame({
  title,
  subtitle,
  submitLabel,
  isSubmitting,
  submitError,
  onSubmit,
  switchText,
  switchLabel,
  switchTo,
  children,
}: {
  title: string;
  subtitle: string;
  submitLabel: string;
  isSubmitting: boolean;
  submitError: string;
  onSubmit: (event: FormEvent) => void;
  switchText: string;
  switchLabel: string;
  switchTo: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col px-6 sm:px-12 py-4 lg:py-5">
      <div className="flex flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden scrollbar-hide py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-xs text-gray-500 mb-4">{subtitle}</p>

        <form onSubmit={onSubmit} noValidate className="mt-2 flex flex-col gap-2">
          <div className="space-y-2">{children}</div>

          {submitError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 mt-2"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {submitLabel}
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-gray-500">
          {switchText}{' '}
          <Link to={switchTo} className="font-semibold text-blue-600 hover:text-blue-700">
            {switchLabel}
          </Link>
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
        <span>© {new Date().getFullYear()} FlexOffice Technologies</span>
        <span>Privacy · Terms</span>
      </div>
    </div>
  );
}

// ---------- Form Login ----------
const loginInitialValues = { email: '', password: '' };
type LoginValues = typeof loginInitialValues;

function validateLogin(values: LoginValues): FormErrors<LoginValues> {
  const errors: FormErrors<LoginValues> = {};
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.password) errors.password = 'Enter your password.';
  return errors;
}

export function LoginForm() {
  const navigate = useNavigate();

  const form = useAuthForm({
    initialValues: loginInitialValues,
    validate: validateLogin,
    onSubmit: async (values) => {
      await login(values);
      navigate('/');
    },
  });

  return (
    <LoginFormFrame
      title="Welcome Back"
      subtitle="Log in to manage and reserve your workspaces."
      submitLabel="Log In"
      isSubmitting={form.isSubmitting}
      submitError={form.submitError}
      onSubmit={form.handleSubmit}
      switchText="Don't have an account?"
      switchLabel="Register"
      switchTo="/register"
    >
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="alexandra@company.com"
        value={form.values.email}
        onChange={(event) => form.setValue('email', event.target.value)}
        error={form.errors.email}
      />
      <PasswordInput
        label="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={form.values.password}
        onChange={(event) => form.setValue('password', event.target.value)}
        error={form.errors.password}
      />
    </LoginFormFrame>
  );
}

// ---------- Form Registrasi ----------
const registerInitialValues = { name: '', email: '', password: '', password_confirmation: '' };
type RegisterValues = typeof registerInitialValues;

function validateRegister(values: RegisterValues): FormErrors<RegisterValues> {
  const errors: FormErrors<RegisterValues> = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.';
  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Passwords do not match.';
  }
  return errors;
}

export function RegisterForm() {
  const navigate = useNavigate();

  const form = useAuthForm({
    initialValues: registerInitialValues,
    validate: validateRegister,
    resetOnSuccess: true,
    onSubmit: async (values) => {
      await register(values);
      navigate('/verify-email');
    },
  });

  return (
    <RegisterFormFrame
      title="Create Account"
      subtitle="Join FlexOffice to manage and reserve verified workspaces."
      submitLabel="Create Account"
      isSubmitting={form.isSubmitting}
      submitError={form.submitError}
      onSubmit={form.handleSubmit}
      switchText="Already have an account?"
      switchLabel="Log In"
      switchTo="/login"
    >
      <TextField
        label="Full Name"
        autoComplete="name"
        placeholder="e.g. Alexandra Chen"
        value={form.values.name}
        onChange={(event) => form.setValue('name', event.target.value)}
        error={form.errors.name}
      />
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="alexandra@company.com"
        value={form.values.email}
        onChange={(event) => form.setValue('email', event.target.value)}
        error={form.errors.email}
      />
      <PasswordInput
        label="Password"
        autoComplete="new-password"
        placeholder="Create a strong password"
        value={form.values.password}
        onChange={(event) => form.setValue('password', event.target.value)}
        error={form.errors.password}
      />
      <PasswordInput
        label="Confirm Password"
        autoComplete="new-password"
        placeholder="Re-enter password"
        value={form.values.password_confirmation}
        onChange={(event) => form.setValue('password_confirmation', event.target.value)}
        error={form.errors.password_confirmation}
      />
    </RegisterFormFrame>
  );
}