import { InstaQLEntity } from "@instantdb/react";
import EmailMessage from './EmailMessage';

type EmailEntity = InstaQLEntity<any, "emails">;

interface ChatAreaProps {
  emails: EmailEntity[];
  subject: string;
}

export default function ChatArea({ emails, subject }: ChatAreaProps) {
  return (
    <div className="flex-grow overflow-y-auto p-6 bg-gray-700">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-600">#{subject}</h2>
      <div className="space-y-6">
        {emails.map((email, index) => (
          <EmailMessage 
            key={email.id} 
            email={email} 
            showAvatar={index === 0 || emails[index - 1].from !== email.from}
          />
        ))}
      </div>
    </div>
  );
}

