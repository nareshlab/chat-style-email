import { Card, CardBody } from '@nextui-org/react';
import { Email } from '../types/email';
import EmailGroup from './EmailGroup';

interface EmailListProps {
  groupedEmails: Record<string, Email[]>;
}

export default function EmailList({ groupedEmails }: EmailListProps) {
  return (
    <div className="space-y-4">
      {Object.entries(groupedEmails).map(([subject, emails]) => (
        <Card key={subject}>
          <CardBody>
            <EmailGroup subject={subject} emails={emails} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

