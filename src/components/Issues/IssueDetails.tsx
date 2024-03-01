import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import IssueComments from '../IssueComments/IssueComments';
import { renderDateAgo } from '../../utils/calcData';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

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

const IssueDetails = () => {
	const { issueId } = useParams();
	const { loading, error, data } = useQuery(GET_ISSUE_INFORMATION, {
		variables: { id: issueId }
	});

	return (
		<div className='w-[90%] mx-auto'>
			{loading && <h2 className='text-3xl'>loading...</h2>}
			{error && loading && (
				<h2 className='text-red-600 text-3xl'>error</h2>
			)}
			{issueId && data && data.node && (
				<>
					<div>
						<h2 className='font-semibold text-lg text-left'>
							{data.node.titleHTML}{' '}
							<span className='text-[#848d97] font-thin text-2xl'>
								#{data.node.number}
							</span>
						</h2>
					</div>

					<div className='mb-10 border-[1px]  border-[#30363d] rounded-lg'>
						<header className=' block bg-[#161b22] w-[100%] px-4 py-1.5 rounded-t-lg'>
							<h2 className='text-[18px] text-left'>
								{data.node.author.login}{' '}
								<span className='text-[#848d97] text-[15px]'>
									{renderDateAgo(data.node.createdAt)}
								</span>
							</h2>
						</header>
						<div
							className='text-left p-4 space-y-5'
							dangerouslySetInnerHTML={{
								__html: data.node.bodyHTML
							}}
						/>
					</div>
					{data.node.comments.totalCount > 0 && (
						<IssueComments comments={data.node.comments} />
					)}

					<AddCommentForm issueId={data.node.id} />
				</>
			)}
		</div>
	);
};

export default IssueDetails;
