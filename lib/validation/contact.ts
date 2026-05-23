import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, { message: 'Tiêu đề phải có ít nhất 5 ký tự' }),
  message: z.string().min(10, { message: 'Nội dung phải có ít nhất 10 ký tự' }),
  locale: z.enum(['vi', 'ja']),
});

export type ContactInput = z.infer<typeof contactSchema>;
