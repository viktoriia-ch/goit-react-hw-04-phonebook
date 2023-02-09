import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import useLocalStorage from 'shared/hooks/useLocalStorage';

import styles from './app.module.css';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return Notify.warning(`Contact '${name}: ${number}' is already exist`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
    );
  };

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    return contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter handleChange={handleFilter} value={filter} />
      <ContactList contacts={filteredContacts} removeContact={removeContact} />
    </div>
  );
};

export default App;
