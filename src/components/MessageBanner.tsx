import React from 'react';
import { X, AlertTriangle, Info, CheckCircle, AlertOctagon } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

interface Message {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  dismissed?: boolean;
}

interface MessageBannerProps {
  messages: Message[];
  onDismiss: (messageId: string) => void;
}

export function MessageBanner({ messages, onDismiss }: MessageBannerProps) {
  const { token } = useAuthStore();

  const handleDismiss = async (messageId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/${messageId}/dismiss`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onDismiss(messageId);
    } catch (error) {
      console.error('Failed to dismiss message:', error);
    }
  };

  const getIcon = (type: Message['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertOctagon className="w-5 h-5" />;
    }
  };

  const getBannerStyles = (type: Message['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100';
      case 'success':
        return 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-100';
      case 'error':
        return 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-100';
    }
  };

  const activeMessages = messages.filter(msg => !msg.dismissed);

  if (activeMessages.length === 0) return null;

  return (
    <div className="space-y-2">
      {activeMessages.map((message) => (
        <div
          key={message.id}
          className={`flex items-center justify-between p-4 rounded-lg ${getBannerStyles(message.type)}`}
        >
          <div className="flex items-center space-x-3">
            {getIcon(message.type)}
            <p className="text-sm font-medium">{message.message}</p>
          </div>
          <button
            onClick={() => handleDismiss(message.id)}
            className="p-1 hover:opacity-75 transition-opacity"
            aria-label="Dismiss message"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}