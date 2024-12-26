import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Email } from '../types/email';
import { formatSubject } from '../utils/emailUtils';

interface ComposeEmailProps {
  onSendEmail: (email: Email) => void;
  replyTo?: string;
}

export default function ComposeEmail({ onSendEmail, replyTo }: ComposeEmailProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newEmail: Email = {
      id: `msg${Date.now()}`,
      account_id: 'current_user',
      created: new Date().toISOString(),
      date: new Date().toISOString(),
      from: 'current_user@example.com',
      from_name: 'Current User',
      message_id: `current_user_msg${Date.now()}`,
      snippet: message,
      subject: replyTo ? formatSubject(replyTo, true) : 'New Message',
      updated: new Date().toISOString(),
    };
    onSendEmail(newEmail);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${replyTo ? '#' + replyTo : ''}`}
          className="flex-grow mr-2"
          size="lg"
          variant="bordered"
        />
        <Button type="submit" color="primary" size="lg">
          Send
        </Button>
      </div>
    </form>
  );
}

