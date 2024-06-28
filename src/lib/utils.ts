import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { md5 } from 'js-md5';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function md5Hash(password: string) {
  return md5(password).slice(3, 21);
}
