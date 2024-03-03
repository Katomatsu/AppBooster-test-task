import { ApolloError } from '@apollo/client';
import { FormEvent, useState } from 'react';



interface AddCommentFormProps {
	mutationLoading: boolean;
	mutationError: ApolloError | undefined;
	mutationData: string;
	onAddComment: (body: string, event: FormEvent<HTMLFormElement>) => void;
}

const AddCommentForm = ({ onAddComment, mutationData, mutationError, mutationLoading} : AddCommentFormProps) => {
	

	const [body, setBody] = useState('');

	const bodyChangeHandler = (value: string) => {
		setBody(value);
	};

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		onAddComment(body, event);
    setBody('')
  };

	return (
		<form
			onSubmit={submitHandler}
			className='flex flex-col w-[100%] mx-auto mt-5 '
		>
			{mutationLoading && <h2>Loading...</h2>}
			{mutationError && !mutationLoading && <pre>{JSON.stringify(mutationData)}</pre>}

			<label htmlFor='comment-body' className='font-bold text-left text-xl mb-2'>Add a comment</label>
			<textarea
				id='comment-body'
				value={body}
				placeholder='Add your comment here...'
				onChange={event => bodyChangeHandler(event.target.value)}
				className='mb-5 outline-none p-2 bg-[#0d1117] rounded-lg border-[1px] border-[#30363d] min-h-[70px]'
			/>
			<button
				type='submit'
				className='bg-[#172554] block mx-auto w-[100px] min-h-[30px] rounded-lg'
			>
				Comment
			</button>
		</form>
	);
};

export default AddCommentForm;
