import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import IssueComments from '../IssueComments/IssueComments';
import { renderDateAgo } from '../../utils/calcData';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import { FormEvent } from 'react';

const GET_ISSUE_INFORMATION = gql`
	query GetIssueInformation($id: ID!) {
		node(id: $id) {
			... on Issue {
				createdAt
				titleHTML
				number
				author {
					login
				}
				bodyHTML
				id
				comments(first: 100) {
					totalCount
					nodes {
						id
						bodyHTML
						createdAt
						author {
							login
						}
					}
				}
			}
		}
	}
`;

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

const IssueDetails = () => {
	const { issueId } = useParams();
	const {
		loading: queryLoading,
		error: queryError,
		data: queryData
	} = useQuery(GET_ISSUE_INFORMATION, {
		variables: { id: issueId }
	});

	const [
		addComment,
		{ loading: mutationLoading, error: mutationError, data: mutationData }
	] = useMutation(ADD_COMMENT_TO_FORM, {
		refetchQueries: [
			{
				query: GET_ISSUE_INFORMATION,
				variables: {
					id: issueId
				}
			}
		]
	});

	const addCommentHandler = async (
		body: string,
		event: FormEvent<HTMLFormElement>
	) => {
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
		<div className='w-[90%] mx-auto'>
			{queryLoading && <h2 className='text-3xl'>loading...</h2>}
			{queryError && !queryLoading && (
				<h2 className='text-red-600 text-3xl'>error</h2>
			)}
			{issueId && queryData && queryData.node && (
				<>
					<div>
						<h2 className='font-semibold text-lg text-left'>
							{queryData.node.titleHTML}{' '}
							<span className='text-[#848d97] font-thin text-2xl'>
								#{queryData.node.number}
							</span>
						</h2>
					</div>

					<div className='mb-10 border-[1px]  border-[#30363d] rounded-lg'>
						<header className=' block bg-[#161b22] w-[100%] px-4 py-1.5 rounded-t-lg'>
							<h2 className='text-[18px] text-left'>
								{queryData.node.author.login}{' '}
								<span className='text-[#848d97] text-[15px]'>
									{renderDateAgo(queryData.node.createdAt)}
								</span>
							</h2>
						</header>
						<div
							className='text-left p-4 space-y-5'
							dangerouslySetInnerHTML={{
								__html: queryData.node.bodyHTML
							}}
						/>
					</div>
					{queryData.node.comments.totalCount > 0 && (
						<IssueComments comments={queryData.node.comments} />
					)}

					<AddCommentForm
						mutationLoading={mutationLoading}
						mutationError={mutationError}
						mutationData={mutationData}
						onAddComment={addCommentHandler}
					/>
				</>
			)}
		</div>
	);
};

export default IssueDetails;
