import { InstaQLEntity } from "@instantdb/react";

type EmailEntity = InstaQLEntity<any, "emails">;

interface SidebarProps {
  groupedEmails: Record<string, EmailEntity[]>;
  selectedSubject: string | null;
  onSelectSubject: (subject: string) => void;
}

export default function Sidebar({ groupedEmails, selectedSubject, onSelectSubject }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Email Chat</h1>
        <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Conversations</h2>
      </div>
      {Object.entries(groupedEmails).map(([subject, emails]) => (
        <button
          key={subject}
          onClick={() => onSelectSubject(subject)}
          className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
            selectedSubject === subject ? 'bg-blue-600' : ''
          }`}
        >
          <span className="text-gray-300"># </span>
          <span className="truncate">{subject}</span>
        </button>
      ))}
    </div>
  );
}

