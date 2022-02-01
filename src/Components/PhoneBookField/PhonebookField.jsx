import { Form, Label, Input, Button } from './PhonebookField.styled';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PhonebookField extends Component {
	state = {
		name: '',
		number: '',
	};

	setInputValue = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		return (
			<Form onSubmit={(e) => this.props.addContact(e, this.state.name, this.state.number)}>
				<Label>
					Name
					<Input
						onChange={this.setInputValue}
						value={this.props.contacts.name}
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
						onChange={this.setInputValue}
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
	}
}

PhonebookField.propTypes = {
	addContact: PropTypes.func.isRequired,
	contacts: PropTypes.array.isRequired,
};
