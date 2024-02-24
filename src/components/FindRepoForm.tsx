import { FormEvent, useState } from 'react';
import Input from './UI/Input';

interface FindRepoFormProps {
	submitHandler: (event: FormEvent, name: string, owner: string) => void;
}

const FindRepoForm = ({ submitHandler }: FindRepoFormProps) => {
	const [input, setInput] = useState({
		name: '',
		owner: ''
	});
	const nameChangeHandler = (value: string) => {
		setInput({ ...input, name: value });
	};
	const ownerChangeHandler = (value: string) => {
		setInput({ ...input, owner: value });
	};
	return (
		<form
			onSubmit={event => submitHandler(event, input.name, input.owner)}
			className='flex flex-col w-[200px] mx-auto'
		>
			<Input
				onChange={ownerChangeHandler}
				value={input.owner}
				type='text'
				name='repo-owner'
				label='Repository Owner'
			/>
			<Input
				onChange={nameChangeHandler}
				value={input.name}
				type='text'
				name='repo-name'
				label='Repository Name'
			/>

			<button type='submit' className='block mx-auto w-[100%] bg-[#38bdf8] text-black'>
				Find Issues
			</button>
		</form>
	);
};

export default FindRepoForm;
