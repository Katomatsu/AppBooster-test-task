import { gql, useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';

const ADD_COMMENT_TO_FORM = gql`
	mutation AddCommentToForm($subjectId: ID!, $body: String!) {
		addComment(input: { subjectId: $subjectId, body: $body }) {
			commentEdge {
				node {
					id
					body
				}
			}
		}
	}
`;

interface AddCommentFormProps {
  issueId: string
}

const AddCommentForm = ({issueId} : AddCommentFormProps) => {
	const [addComment, { loading, data, error }] =
		useMutation(ADD_COMMENT_TO_FORM);

	const [body, setBody] = useState('');

	const bodyChangeHandler = (value: string) => {
		setBody(value);
	};


	const addCommentHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const { data } = await addComment({
				variables: {
					subjectId: issueId,
					body: body
				}
			});
			console.log('Comment added: ', data);
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	};

	return (
		<form
			onSubmit={addCommentHandler}
			className='flex flex-col w-[100%] mx-auto mt-5 '
		>
			{loading && <h2>Loading...</h2>}
			{error && !loading && <pre>{JSON.stringify(data, null, 2)}</pre>}

			<label htmlFor='comment-body' className='font-bold text-left text-xl mb-2'>Add a comment</label>
			<textarea
				id='comment-body'
				value={body}
				placeholder='Add your comment here...'
				onChange={event => bodyChangeHandler(event.target.value)}
				className='mb-5 outline-none p-2 bg-[#0d1117] rounded-lg border-[1px] border-[#30363d]'
			/>
			<button
				type='submit'
				className='bg-[#172554] block mx-auto w-[100px] min-h-[30px]'
			>
				Comment
			</button>
		</form>
	);
};

export default AddCommentForm;
