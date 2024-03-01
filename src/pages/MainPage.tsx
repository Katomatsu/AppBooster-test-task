
import { gql, useLazyQuery } from '@apollo/client';
import FindRepoForm from '../components/FindRepoForm/FindRepoForm'
import IssueList from '../components/Issues/IssueList'
import { FormEvent } from 'react';




const GET_ISSUES = gql`
	query GetRepositoryIssues($name: String!, $owner: String!) {
		repository(name: $name, owner: $owner) {
			id
			name
			nameWithOwner
			issues(first: 100) {
				totalCount
				nodes {
					id
          titleHTML
					bodyHTML
          number
          state
          closedAt
          createdAt
					author {
						login
					}
					comments {
						totalCount
					}
				}
			}
		}
	}
`;

const MainPage = () => {

  const [fetchUser, { data, loading, error }] = useLazyQuery(GET_ISSUES);

	const submitHandler = (event: FormEvent, name: string, owner: string) => {
		event.preventDefault();
		fetchUser({ variables: { name: name, owner: owner } });
	};

  return (
		<>
			<FindRepoForm submitHandler={submitHandler} />
			{loading && <h2>Loading</h2>}
			{error && <h2>Error</h2>}
			{data && (
				<>
					<h2>Repo Name: {data.repository.name}</h2>
					{data.repository.issues.totalCount > 0 ? (
						<>
							<h3>
								Total Issues Count:
								{data.repository.issues.totalCount}
							</h3>
							<IssueList issues={data.repository.issues} />
						</>
					) : (
						<h2>There is no issues</h2>
					)}
				</>
			)}
		</>
  );
}

export default MainPage