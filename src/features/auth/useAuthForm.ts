// Bagian: Logika form auth
// Tugas: hook yang menyimpan isi form, error per kolom, dan status mengirim, serta fungsi cek email dan password.
// Bukan tugas file ini: tampilan form atau pemanggilan API (diterima lewat onSubmit).

import { useState, type FormEvent } from 'react';

// ASUMSI: panjang minimal password 8 karakter. Belum tertulis di SRS, sesuaikan dengan aturan backend.
export const MIN_PASSWORD_LENGTH = 8;

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export type FormErrors<T> = Partial<Record<keyof T, string>>;

type UseAuthFormOptions<T> = {
  initialValues: T;
  validate: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => Promise<void>;
  resetOnSuccess?: boolean; // kosongkan form setelah berhasil
};

export function useAuthForm<T extends Record<string, string>>({
  initialValues,
  validate,
  onSubmit,
  resetOnSuccess = false,
}: UseAuthFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengetik di sebuah kolom otomatis menghapus error kolom itu.
  function setValue(key: keyof T, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isSubmitting) return; // cegah kirim ganda (mis. Enter ditekan dua kali)

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      if (resetOnSuccess) setValues(initialValues);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return { values, errors, submitError, isSubmitting, setValue, handleSubmit };
}