import axios from 'axios';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export function handleApiError(error: unknown): never {
  const message = getErrorMessage(error);
  console.error('API Error:', error);
  throw new Error(message);
}