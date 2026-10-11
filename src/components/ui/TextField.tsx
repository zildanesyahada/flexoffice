// Bagian: Kolom isian form
// Tugas: TextField (label + input + pesan error) dan PasswordInput (TextField dengan tombol mata).
// Bukan tugas file ini: validasi atau pengiriman form.

import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  rightSlot?: ReactNode; // isi di sisi kanan input (mis. ikon mata)
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, rightSlot, id, className = '', ...props }, ref) => {
    // useId membuat id unik, penting karena form Login dan Register sama-sama ada di halaman
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;

    return (
      <div>
        <label
          htmlFor={inputId}
          className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-700"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`h-9 sm:h-10 w-full rounded-lg border bg-gray-50 px-3 text-xs lg:text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
              rightSlot ? 'pr-10' : ''
            } ${
              error
                ? 'border-red-400 focus:ring-red-100'
                : 'border-gray-200 focus:border-blue-600 focus:ring-blue-100'
            } ${className}`}
            {...props}
          />
          {rightSlot && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightSlot}</div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';

// TextField dengan tombol mata untuk menampilkan atau menyembunyikan password.
export const PasswordInput = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'type' | 'rightSlot'>>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <TextField
        ref={ref}
        type={visible ? 'text' : 'password'}
        rightSlot={
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="text-gray-400 transition-colors hover:text-gray-700"
          >
            {visible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        }
        {...props}
      />
    );
  },
);
PasswordInput.displayName = 'PasswordInput';