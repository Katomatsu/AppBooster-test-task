import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_ISSUE_INFORMATION = gql`
	query GetIssueInformation($id: ID!) {
		node(id: $id) {
			... on Issue {
				bodyHTML
				id
				comments(first: 100) {
          totalCount
					nodes {
						bodyHTML
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
			{error && <h2 className='text-red-600 text-3xl'>error</h2>}
			{issueId && data && data.node && (
				<div>
					<div
						dangerouslySetInnerHTML={{
							__html: data.node.bodyHTML
						}}
					/>
          <div>
            {data.node.comments.totalCount > 0 && data.node.comments.nodes.map((item) => {
              return (
					<div>
						{data.node.comments.totalCount} <br />
						{item.author.login}
						<div
							dangerouslySetInnerHTML={{ __html: item.bodyHTML }}
						/>
					</div>
				);
            })}
          </div>
				</div>
			)}
		</div>
	);
};

export default IssueDetails;
