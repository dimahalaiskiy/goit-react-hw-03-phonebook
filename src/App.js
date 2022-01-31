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
		name: '',
		number: '',
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

	setInputValue = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	setContactName = (e) => {
		e.preventDefault();
		const { contacts, name, number } = this.state;

		let isUniq = contacts.filter((contact) =>
			contact.name.toLowerCase().includes(name.toLowerCase())
		);
		if (isUniq.length !== 0) {
			toast('Контакт с таким именем уже существует!');
			return;
		}

		this.setState({
			contacts: [...contacts, { id: keyGenerator.password(), name, number }],
			name: '',
		});

		e.target.reset();
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
				<ToastContainer />
			</Container>
		);
	}
}

export default App;
