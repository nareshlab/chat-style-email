import { InstaQLEntity } from "@instantdb/react";

type EmailEntity = InstaQLEntity<any, "emails">;

export function groupAndSortEmails(emails: EmailEntity[]): Record<string, EmailEntity[]> {
  const groupedEmails: Record<string, EmailEntity[]> = {};

  emails.forEach((email) => {
    let subject = email.subject || 'No Subject';
    subject = subject.replace(/^(Re:\s*)+/i, '');

    if (!groupedEmails[subject]) {
      groupedEmails[subject] = [];
    }
    groupedEmails[subject].push(email);
  });

  Object.keys(groupedEmails).forEach((subject) => {
    groupedEmails[subject].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  return groupedEmails;
}

export function formatSubject(subject: string, isReply: boolean): string {
  if (!subject) return 'No Subject';
  return isReply && !subject.toLowerCase().startsWith('re:') ? `Re: ${subject}` : subject;
}

