"use client";

import { useState, useEffect } from 'react';
import { id, i, init, InstaQLEntity } from "@instantdb/react";
import { Email } from '../types/email';
import { groupAndSortEmails } from '../utils/emailUtils';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import ComposeEmail from '../components/ComposeEmail';

// ID for app: Chat Style Email
const APP_ID = "d3271280-bd0f-42c4-a0d3-1bb3125a3c68";

// Define schema for emails
const schema = i.schema({
  entities: {
    emails: i.entity({
      account_id: i.string(),
      created: i.string(),
      date: i.string(),
      from: i.string(),
      from_name: i.string(),
      message_id: i.string(),
      snippet: i.string(),
      subject: i.string(),
      updated: i.string(),
    }),
  },
});

type EmailEntity = InstaQLEntity<typeof schema, "emails">;

const db = init({ appId: APP_ID, schema });

export default function Home() {
  const [groupedEmails, setGroupedEmails] = useState<Record<string, EmailEntity[]>>({});
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoading, data } = db.useQuery({ emails: {} });

  useEffect(() => {
    if (data?.emails) {
      const grouped = groupAndSortEmails(data.emails);
      setGroupedEmails(grouped);
      setSelectedSubject(Object.keys(grouped)[0] || null);
    }
  }, [data]);

  const handleSendEmail = async (newEmail: Email) => {
    try {
      await db.transact(
        db.tx.emails[id()].update({
          ...newEmail,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send email. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar 
        groupedEmails={groupedEmails} 
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />
      <div className="flex flex-col flex-grow">
        <ChatArea 
          emails={selectedSubject ? groupedEmails[selectedSubject] : []} 
          subject={selectedSubject || ''}
        />
        <ComposeEmail onSendEmail={handleSendEmail} replyTo={selectedSubject} />
      </div>
    </div>
  );
}

