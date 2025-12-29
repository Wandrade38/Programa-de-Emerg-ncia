
import React, { useState } from 'react';
import { PlusCircleIcon } from './icons';

interface ContactFormProps {
  onAdd: (name: string, phone: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onAdd(name.trim(), phone.trim());
      setName('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t border-slate-700 pt-6">
       <h3 className="text-lg font-semibold mb-3 text-center">Adicionar Novo Contato</h3>
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do contato"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone (ex: (11) 9...)"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
      >
        <PlusCircleIcon className="w-6 h-6" />
        Adicionar
      </button>
    </form>
  );
};

export default ContactForm;
