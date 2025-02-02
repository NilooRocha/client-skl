import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (
  error: any,
  showToast: (message: string, type: 'error' | 'success') => void
) => {
  const fallbackMessage = 'Something went wrong. Please try again later.';
  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case 400:
        showToast('Bad request. Check your input.', 'error');
        break;
      case 401:
        showToast('Unauthorized. Please check your credentials.', 'error');
        break;
      case 500:
        showToast('Server error. Try again later.', 'error');
        break;
      default:
        showToast(fallbackMessage, 'error');
    }
  } else {
    console.error('Unexpected error:', error);
    showToast(fallbackMessage, 'error');
  }
};
