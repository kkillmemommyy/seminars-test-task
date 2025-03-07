import { z } from 'zod';
import { getDateWithoutTime } from './formatters';

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
    .refine(
      (val) => {
        const inputDate = getDateWithoutTime(new Date(val));
        const currentDate = getDateWithoutTime(new Date());
        return inputDate >= currentDate;
      },
      {
        message: 'Дата не может быть в прошлом',
      }
    ),
  time: z.string().nonempty({ message: 'Время обязательно' }),
  photo: z
    .string()
    .trim()
    .url({ message: 'Введите корректный URL изображения' })
    .nonempty({ message: 'Ссылка на фото обязательна' }),
});
