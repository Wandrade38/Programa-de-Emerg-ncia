
import React from 'react';
import type { Contact } from '../types';
import { UserIcon, PhoneIcon, TrashIcon } from './icons';

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  if (contacts.length === 0) {
    return <p className="text-center text-slate-400 py-4">Nenhum contato de emergência adicionado.</p>;
  }

  return (
    <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
        >
          <div className="flex items-center gap-3">
             <UserIcon className="w-6 h-6 text-cyan-400" />
            <div>
              <p className="font-semibold text-lg">{contact.name}</p>
              <p className="text-sm text-slate-300 flex items-center gap-1.5"><PhoneIcon className="w-4 h-4" />{contact.phone}</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-600 rounded-full transition-colors duration-200"
            aria-label={`Remover ${contact.name}`}
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
