import { formatDistanceToNow, differenceInDays, format, parseISO } from 'date-fns';

export function formatExpiryDate(expiryDate: string): string {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysLeft = differenceInDays(expiry, now);
  
  if (daysLeft < 0) {
    return 'Expired';
  }
  
  if (daysLeft === 0) {
    return 'Expires today';
  }
  
  return `${daysLeft} days left`;
}

export function formatDateTime(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'PPpp');
}

export function formatRelativeTime(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

export function isExpired(date: string | Date): boolean {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return parsedDate < new Date();
}