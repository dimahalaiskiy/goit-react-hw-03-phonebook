import React, { Component } from 'react';
import Title from './Components/Title';
import Phonebook from './Components/PhoneBookField';
import Contacts from './Components/Contacts';
import FilterContactsInput from './Components/FilterContactsInput';
import { Container } from './Components/Title/Title.styled';
import keyGenerator from 'keygenerator';

class App extends Component {
	state = {
		contacts: [],
		filter: '',
		name: '',
		number: '',
	};

	setInputValue = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	setContactName = (e) => {
		const { contacts, name, number } = this.state;
		e.preventDefault();
		this.setState({
			contacts: [...contacts, { id: keyGenerator.password(), name, number }],
		});
	};

	setFilteredContact = (e) => {
		this.setState({
			filter: e.target.value,
		});
	};

	deleteContact = (contactName) => {
		this.setState({
			contacts: [...this.state.contacts.filter((contact) => contact.id !== contactName.id)],
		});
	};

	render() {
		return (
			<Container>
				<Title title='Phonebook'>
					<Phonebook
						addContact={this.setContactName}
						inputValue={this.setInputValue}
						contacts={this.state}
					/>
				</Title>
				<Title title='Contacts'></Title>
				<FilterContactsInput
					setFilter={this.setFilteredContact}
					filteredValue={this.state.filter}
				/>
				<Contacts
					contacts={this.state.contacts}
					filter={this.state.filter}
					deleteContact={this.deleteContact}
				/>
			</Container>
		);
	}
}

export default App;
