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
		filteredContacts: [],
		filter: '',
		name: '',
		number: '',
	};

	STORAGE = 'contact';

	componentDidMount() {
		this.setState({
			contacts: JSON.parse(localStorage.getItem(this.STORAGE)),
		});
	}

	componentDidUpdate() {
		localStorage.setItem(this.STORAGE, JSON.stringify(this.state.contacts));
	}

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
		const { contacts } = this.state;
		const { value } = e.target;

		this.setState({
			filter: value,
		});

		this.setState({
			filteredContacts: contacts.filter((contact) =>
				contact.name.toLowerCase().includes(value.toLowerCase())
			),
		});
	};

	deleteContact = (contactName) => {
		const { contacts, filteredContacts } = this.state;

		this.setState({
			contacts: contacts.filter((contact) => contact.id !== contactName.id),
		});

		this.setState({
			filteredContacts: filteredContacts.filter((contact) => contact.id !== contactName.id),
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
					filteredContacts={this.state.filteredContacts}
					contacts={this.state.contacts}
					filter={this.state.filter}
					deleteContact={this.deleteContact}
				/>
			</Container>
		);
	}
}

export default App;
