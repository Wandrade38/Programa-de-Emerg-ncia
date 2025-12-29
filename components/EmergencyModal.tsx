
import React from 'react';
import type { Contact } from '../types';
import { SpinnerIcon, ShieldCheckIcon, PhoneOutgoingIcon } from './icons';

interface EmergencyModalProps {
  contacts: Contact[];
  isLoading: boolean;
  message: string;
  onClose: () => void;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({ contacts, isLoading, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 text-center">
        {isLoading ? (
          <>
            <SpinnerIcon className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">Enviando Alerta...</h2>
            <p className="text-slate-600 mt-2 text-lg">Estamos notificando seus contatos de emergência.</p>
          </>
        ) : (
          <>
            <ShieldCheckIcon className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-green-700">Alerta Enviado!</h2>
            <div className="text-left bg-slate-100 p-4 rounded-lg my-6 text-lg">
                <p className="font-semibold text-slate-800">{message}</p>
            </div>
            
            <div className="border-t border-b border-slate-200 py-4 my-4">
              <h3 className="font-bold text-xl mb-3">Contatos Notificados:</h3>
              <ul className="space-y-2">
                {contacts.map(contact => (
                  <li key={contact.id} className="flex items-center justify-center gap-2 text-slate-700 text-lg">
                    <PhoneOutgoingIcon className="w-5 h-5 text-green-600"/>
                    <span className="font-medium">{contact.name}</span> - {contact.phone}
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors duration-300 mt-4"
            >
              Estou Bem / Cancelar Alerta
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmergencyModal;
