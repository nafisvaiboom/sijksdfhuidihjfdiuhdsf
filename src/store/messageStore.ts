import { create } from 'zustand';
import axios from 'axios';
import { MessageState, CustomMessage } from '../types/messages';
import { useAuthStore } from './authStore';

export const useMessageStore = create<MessageState>()((set) => ({
  messages: [],

  addMessage: async (message) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages`,
        message,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        messages: [...state.messages, response.data]
      }));
    } catch (error) {
      console.error('Failed to add message:', error);
      throw error;
    }
  },

  dismissMessage: async (messageId) => {
    try {
      const token = useAuthStore.getState().token;
      await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/${messageId}/dismiss`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, dismissed: true } : msg
        )
      }));
    } catch (error) {
      console.error('Failed to dismiss message:', error);
      throw error;
    }
  },

  fetchMessages: async () => {
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ messages: response.data });
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw error;
    }
  }
}));