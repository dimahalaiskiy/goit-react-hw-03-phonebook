import React from 'react';
import { Label, Input } from '../PhoneBookField/PhonebookField.styled';

const FilterContactsInput = ({ filteredValue, setFilter }) => {
	return (
		<Label>
			Find contact by name
			<Input onChange={setFilter} type='text' name='filter' value={filteredValue} />
		</Label>
	);
};

export default FilterContactsInput;
