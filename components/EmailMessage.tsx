import { Avatar } from '@nextui-org/react';
import { InstaQLEntity } from "@instantdb/react";

type EmailEntity = InstaQLEntity<any, "emails">;

interface EmailMessageProps {
  email: EmailEntity;
  showAvatar: boolean;
}

export default function EmailMessage({ email, showAvatar }: EmailMessageProps) {
  const isSent = email.from === 'current_user@example.com';

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isSent ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
        {showAvatar && (
          <Avatar
            src={`https://i.pravatar.cc/150?u=${email.from}`}
            name={email.from_name}
            size="sm"
            className={`${isSent ? 'ml-2' : 'mr-2'}`}
          />
        )}
        <div>
          {showAvatar && (
            <div className={`mb-1 ${isSent ? 'text-right' : 'text-left'}`}>
              <span className="font-bold mr-2">{email.from_name}</span>
              <span className="text-xs text-gray-400">
                {new Date(email.date).toLocaleTimeString()}
              </span>
            </div>
          )}
          <div className={`rounded-lg p-3 ${isSent ? 'bg-blue-600' : 'bg-gray-600'}`}>
            <p className="text-sm">{email.snippet}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

