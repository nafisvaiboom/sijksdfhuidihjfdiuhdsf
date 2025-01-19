import React, { useState, useEffect } from 'react';
import { Plus, Trash2, AlertTriangle, Info, CheckCircle, AlertOctagon } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

interface Domain {
  id: string;
  domain: string;
  created_at: string;
}

interface CustomMessage {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  created_at: string;
  created_by_email: string;
  is_active: boolean;
  dismiss_count: number;
}

export function AdminPanel() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [newDomain, setNewDomain] = useState('');
  const [newMessage, setNewMessage] = useState({
    message: '',
    type: 'info' as const
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuthStore();

  useEffect(() => {
    fetchDomains();
    fetchMessages();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/domains`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDomains(response.data);
    } catch (error) {
      console.error('Failed to fetch domains:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSubmitDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/domains/add`,
        { domain: newDomain },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDomains([...domains, response.data]);
      setNewDomain('');
      setError('');
      setSuccess('Domain added successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to add domain');
      setSuccess('');
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/messages`,
        newMessage,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage({ message: '', type: 'info' });
      fetchMessages();
      setSuccess('Message created successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to create message');
    }
  };

  const handleToggleMessage = async (messageId: string, isActive: boolean) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/messages/${messageId}`,
        { is_active: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (error) {
      console.error('Failed to toggle message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/messages/${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const getMessageIcon = (type: CustomMessage['type']) => {
    switch (type) {
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertOctagon className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Domain Management Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Domain Management</h2>
          <form onSubmit={handleSubmitDomain} className="space-y-4">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                Add New Domain
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
                  placeholder="example.com"
                />
                <button
                  type="submit"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#4A90E2] hover:bg-[#357ABD]"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Domain
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Available Domains</h3>
            <ul className="divide-y divide-gray-200">
              {domains.map((domain) => (
                <li key={domain.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{domain.domain}</span>
                    <span className="text-sm text-gray-500">
                      Added {new Date(domain.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Custom Messages Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Custom Messages</h2>
          
          <form onSubmit={handleSubmitMessage} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                New Message
              </label>
              <textarea
                id="message"
                value={newMessage.message}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-[#4A90E2] focus:border-[#4A90E2]"
                rows={3}
                placeholder="Enter your message here..."
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Message Type
              </label>
              <select
                id="type"
                value={newMessage.type}
                onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value as any })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-[#4A90E2] focus:border-[#4A90E2]"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#4A90E2] hover:bg-[#357ABD]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Message
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Active Messages</h3>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-start space-x-3 flex-1">
                    {getMessageIcon(message.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{message.message}</p>
                      <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Created by: {message.created_by_email}</span>
                        <span>Dismissed: {message.dismiss_count} times</span>
                        <span>Created: {new Date(message.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleMessage(message.id, message.is_active)}
                      className={`px-3 py-1 rounded text-sm ${
                        message.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.is_active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}