export type MessageType = 'info' | 'warning' | 'success' | 'error';

export interface CustomMessage {
  id: string;
  message: string;
  type: MessageType;
  isActive: boolean;
  createdAt: string;
  createdByEmail?: string;
  dismissCount?: number;
  dismissed?: boolean;
}

export interface MessageState {
  messages: CustomMessage[];
  addMessage: (message: Omit<CustomMessage, 'id' | 'createdAt'>) => Promise<void>;
  dismissMessage: (messageId: string) => Promise<void>;
  fetchMessages: () => Promise<void>;
}