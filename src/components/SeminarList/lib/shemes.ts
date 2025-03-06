import { z } from 'zod';

export const seminarSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Название обязательно' })
    .max(40, { message: 'Название слишком длинное (максимум 40 символов)' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Описание обязательно' })
    .max(80, { message: 'Описание слишком длинное (максимум 80 символов)' }),
  date: z
    .string()
    .nonempty({ message: 'Дата обязательна' })
    .refine((val) => new Date(val) >= new Date(), {
      message: 'Дата не может быть в прошлом',
    }),
  time: z
    .string()
    .nonempty({ message: 'Время обязательно' })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Неверный формат времени (например, 14:30)',
    }),
  photo: z
    .string()
    .trim()
    .url({ message: 'Введите корректный URL изображения' })
    .nonempty({ message: 'Ссылка на фото обязательна' }),
});
