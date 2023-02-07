import PropTypes from 'prop-types';

import styles from './contact-list.module.css';

const ContactList = ({ contacts, removeContact }) => {
  const contactList = contacts.map(contact => {
    return (
      <li key={contact.id} className={styles.item}>
        <span>
          {contact.name}: {contact.number}
        </span>

        <button
          className={styles.btn}
          onClick={() => removeContact(contact.id)}
          type="button"
        >
          x
        </button>
      </li>
    );
  });
  return <ul className={styles.list}>{contactList}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
