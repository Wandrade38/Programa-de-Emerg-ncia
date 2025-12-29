
import React, { useState, useEffect } from 'react';
import type { Contact } from './types';
import Header from './components/Header';
import EmergencyButton from './components/EmergencyButton';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import EmergencyModal from './components/EmergencyModal';
import { getReassuringMessage } from './services/geminiService';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const savedContacts = localStorage.getItem('emergencyContacts');
      return savedContacts ? JSON.parse(savedContacts) : [
        { id: '1', name: 'Filho João', phone: '(11) 98765-4321' },
        { id: '2', name: 'Vizinha Maria', phone: '(11) 91234-5678' },
      ];
    } catch (error) {
      console.error("Failed to parse contacts from localStorage", error);
      return [];
    }
  });
  
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reassuringMessage, setReassuringMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
    } catch (error) {
      console.error("Failed to save contacts to localStorage", error);
    }
  }, [contacts]);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = (id: string) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleEmergency = async () => {
    if (contacts.length === 0) {
      alert("Por favor, adicione pelo menos um contato de emergência.");
      return;
    }
    setIsEmergencyActive(true);
    setIsLoading(true);
    setReassuringMessage('');

    try {
      const message = await getReassuringMessage();
      setReassuringMessage(message);
    } catch (error) {
      console.error("Error fetching reassuring message:", error);
      setReassuringMessage("Ajuda a caminho. Por favor, mantenha a calma e espere em um local seguro. Seus contatos foram avisados.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetEmergency = () => {
    setIsEmergencyActive(false);
    setIsLoading(false);
    setReassuringMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full max-w-4xl flex flex-col items-center flex-grow">
        <div className="w-full flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 bg-slate-800 rounded-2xl shadow-lg">
             <p className="text-center text-lg text-slate-300 mb-6">Em caso de emergência, pressione o botão abaixo.</p>
            <EmergencyButton onClick={handleEmergency} />
             <p className="text-center text-sm text-slate-400 mt-6">Seus contatos de emergência serão notificados.</p>
          </div>
          <div className="lg:w-1/2 p-6 bg-slate-800 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">Contatos de Emergência</h2>
            <ContactList contacts={contacts} onDelete={deleteContact} />
            <ContactForm onAdd={addContact} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm mt-8">
        <p>Criado para a segurança e tranquilidade dos nossos idosos.</p>
      </footer>
      {isEmergencyActive && (
        <EmergencyModal
          contacts={contacts}
          isLoading={isLoading}
          message={reassuringMessage}
          onClose={resetEmergency}
        />
      )}
    </div>
  );
};

export default App;
