import React from 'react';
import { Form, Label, Input, Button } from './PhonebookField.styled';
import PropTypes from 'prop-types';

const Phonebook = ({ contacts, addContact, inputValue }) => {
	return (
		<Form onSubmit={addContact}>
			<Label>
				Name
				<Input
					onChange={inputValue}
					value={contacts.name}
					type='text'
					name='name'
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
				/>
			</Label>
			<Label>
				Number
				<Input
					onChange={inputValue}
					type='tel'
					name='number'
					pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
					title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
					required
				/>
			</Label>
			<Button type='submit'>Add Contact</Button>
		</Form>
	);
};

Phonebook.propTypes = {
	contacts: PropTypes.shape({
		contacts: PropTypes.array.isRequired,
		name: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
	}),
};

export default Phonebook;
