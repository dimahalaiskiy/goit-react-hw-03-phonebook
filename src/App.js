import React, { Component } from 'react';
import Title from './Components/Title';
import Phonebook from './Components/PhoneBookField';
import Contacts from './Components/Contacts';
import FilterContactsInput from './Components/FilterContactsInput';
import { Container } from './Components/Title/Title.styled';
import keyGenerator from 'keygenerator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	state = {
		contacts: [],
		filter: '',
	};

	STORAGE = 'contact';

	componentDidMount() {
		let contactsData = JSON.parse(localStorage.getItem(this.STORAGE));
		if (contactsData) {
			this.setState({
				contacts: JSON.parse(localStorage.getItem(this.STORAGE)),
			});
		}
	}

	componentDidUpdate() {
		localStorage.setItem(this.STORAGE, JSON.stringify(this.state.contacts));
	}

	setContactName = (e, name, number) => {
		e.preventDefault();
		const { contacts } = this.state;

		let isUniq = contacts.filter((contact) =>
			contact.name.toLowerCase().includes(name.toLowerCase())
		);
		if (isUniq.length !== 0) {
			toast('Контакт с таким именем уже существует!');
			return;
		}

		this.setState({
			contacts: [...contacts, { id: keyGenerator.password(), name, number }],
		});
	};

	setFilteredContact = (e) => {
		const { value } = e.target;

		this.setState({
			filter: value,
		});
	};

	deleteContact = (contactName) => {
		const { contacts } = this.state;

		this.setState({
			contacts: contacts.filter((contact) => contact.id !== contactName.id),
		});
	};

	filteredContacts = () => {
		return this.state.contacts.filter((contact) =>
			contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
		);
	};

	render() {
		return (
			<Container>
				<Title title='Phonebook'>
					<Phonebook addContact={this.setContactName} contacts={this.state.contacts} />
				</Title>
				<Title title='Contacts'></Title>
				<FilterContactsInput
					setFilter={this.setFilteredContact}
					filteredValue={this.state.filter}
				/>
				<Contacts
					contacts={this.state.contacts}
					filteredContacts={this.filteredContacts()}
					filter={this.state.filter}
					deleteContact={this.deleteContact}
				/>
				<ToastContainer />
			</Container>
		);
	}
}

export default App;
