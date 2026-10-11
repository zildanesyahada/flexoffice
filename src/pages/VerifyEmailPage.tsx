import { useState, useRef, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Pencil, Clock, Lock } from 'lucide-react';

export function VerifyEmailPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#131927] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl relative">

        <div className="flex justify-between items-center mb-8">
          <Link to="/auth" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Link>
          <img src="/assets/images/logo.png" alt="FlexOffice" className="h-6 w-auto object-contain" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-sm text-gray-500 leading-relaxed px-4">
            We've sent a 6-digit verification code to your authorized work account.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full py-1.5 px-4 text-xs text-gray-700 font-mono">
            <Mail className="size-3.5 text-gray-400" />
            <span>alexandra.c***@enterprise.com</span>
            <button className="text-blue-600 hover:text-blue-800 ml-1">
              <Pencil className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-2 sm:gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl border border-gray-200 text-center text-2xl font-semibold text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-all bg-white"
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-8 text-sm">
          <Clock className="size-4 text-gray-400" />
          <span className="text-gray-500">Expires in</span>
          <span className="text-red-500 font-semibold font-mono">00:00</span>
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition-colors mb-6 shadow-md shadow-blue-600/20">
          Verify Email
        </button>

        <div className="text-center text-sm text-gray-500 mb-8">
          Didn't receive it? <button className="font-semibold text-blue-600 hover:underline">Resend Code</button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 pt-4 border-t border-gray-100">
          <Lock className="size-3.5" />
          <span>Secured with 256-bit TLS encryption</span>
        </div>

      </div>
    </div>
  );
}