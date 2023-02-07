import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './app.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('my-contacts'));

    if (list?.length) {
      this.setState({
        contacts: list,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return Notify.warning(`Contact '${name}: ${number}' is already exist`);
    }
    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
    );
  };

  isDublicate = (name, number) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    return contacts.some(
      contact =>
        contact.name.toLowerCase() === normalizedName ||
        contact.number.toLowerCase() === normalizedNumber
    );
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  render() {
    const { filter } = this.state;
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter handleChange={handleFilter} value={filter} />
        <ContactList contacts={contacts} removeContact={removeContact} />
      </div>
    );
  }
}

export default App;
