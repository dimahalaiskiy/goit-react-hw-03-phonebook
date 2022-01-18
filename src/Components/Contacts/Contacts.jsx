import React from 'react';
import { ContactList, ListItem } from './Contacts.styled';
import { Button } from '../PhoneBookField/PhonebookField.styled';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, filter, deleteContact }) => {
	let filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<ContactList>
			{filter
				? filteredContacts.map((contact) => {
						return (
							<ListItem key={contact.id}>
								{contact.name}: {contact.number}
								<Button onClick={() => deleteContact(contact)}>Delete</Button>
							</ListItem>
						);
				  })
				: contacts.map((contact) => {
						return (
							<ListItem key={contact.id}>
								{contact.name}: {contact.number}
								<Button onClick={() => deleteContact(contact)}>Delete</Button>
							</ListItem>
						);
				  })}
		</ContactList>
	);
};

Contacts.propTypes = {
	contacts: PropTypes.array.isRequired,
	filter: PropTypes.string.isRequired,
};

export default Contacts;
