import { useState, useEffect } from 'react';
import ContactList from './Contacts/Contact';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const filterdContacts = () => {
    if (!filter) {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };
  console.log(filterdContacts());
  useEffect(() => {
    const stringifyContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifyContacts);
  }, [contacts]);

  const onDelete = id => {
    const newArray = contacts.filter(c => c.id !== id);
    setContacts(newArray);
  };

  const addToContacts = contact => {
    if (
      contacts.find(c => c.name.toLowerCase() === contact.name.toLowerCase())
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevState => [...prevState, contact]);
  };

  const handleChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm addToContacts={addToContacts} />
      <h2 className="title">Contacts</h2>
      <Filter handleChange={handleChange} value={filter} />
      <ContactList
        contacts={filterdContacts()}
        filter={filter}
        onDelete={onDelete}
      />
    </div>
  );
}
