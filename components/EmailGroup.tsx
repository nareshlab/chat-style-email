import { Email } from '../types/email';
import EmailMessage from './EmailMessage';

interface EmailGroupProps {
  subject: string;
  emails: Email[];
}

export default function EmailGroup({ subject, emails }: EmailGroupProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{subject}</h3>
      <div className="space-y-2">
        {emails.map((email) => (
          <EmailMessage key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}

