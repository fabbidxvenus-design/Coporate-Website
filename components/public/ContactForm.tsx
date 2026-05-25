'use client'

import { useState } from 'react';
import { contactSchema } from '@/lib/validation/contact';
import type { Locale } from '@/lib/i18n';

interface ContactFormProps {
  locale: Locale;
  dict: {
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
    send: string;
  };
}

export function ContactForm({ locale, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: locale === 'vi' ? 'Project Manager' : 'Project Manager',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) =>
        Object.fromEntries(Object.entries(prev).filter(([key]) => key !== name)),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const result = contactSchema.safeParse({ ...formData, locale });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'Project Manager',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
        <p className="font-semibold">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline hover:no-underline">
          Gửi tin nhắn khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {status === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Đã xảy ra lỗi. Vui lòng thử lại sau.
        </div>
      )}

      <div>
        <label htmlFor="position" className="mb-2 block text-sm font-medium text-gray-700">
          Vị trí bạn muốn ứng tuyển
        </label>
        <div className="relative">
          <select
            id="position"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="block w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option value="Project Manager">Project Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg
              aria-hidden="true"
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
          {dict.name} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Nhập họ và tên ..."
          value={formData.name}
          onChange={handleChange}
          className={`block w-full rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          {dict.email} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Nhập email..."
          value={formData.email}
          onChange={handleChange}
          className={`block w-full rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
          {dict.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Nhập số điện thoại..."
          value={formData.phone}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Nhập tin nhắn bạn muốn nhắn gửi..."
          value={formData.message}
          onChange={handleChange}
          className={`block w-full resize-none rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <div>
        <label htmlFor="file-upload" className="mb-2 block text-sm font-medium text-gray-700">
          Upload CV
        </label>
        <div className="group mt-1 flex cursor-pointer justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pb-6 pt-5 transition-colors hover:bg-gray-50">
          <div className="flex items-center justify-center gap-3 space-y-2 text-center">
            <svg
              aria-hidden="true"
              className="text-gray-400 group-hover:text-primary"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-gray-500 transition-colors hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              >
                <span>Upload CV (pdf, docx, doc)</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex w-full min-w-[240px] justify-center !rounded-[8px] border border-transparent bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#007a89] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {status === 'submitting' ? 'Đang gửi...' : dict.send}
        </button>
      </div>

      <div className="pt-2 text-center">
        <p className="text-sm text-gray-600">
          Bạn cần hỗ trợ?{' '}
          <a className="font-medium text-gray-900 transition-colors hover:text-primary" href="#">
            Contact Us
          </a>
        </p>
      </div>
    </form>
  );
}