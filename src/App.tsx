import { FormEvent } from 'react';
import './App.css';
import { gql, useLazyQuery } from '@apollo/client';
import FindRepoForm from './components/FindRepoForm';
import IssueList from './components/IssueList';

const GET_ISSUES = gql`
	query GetRepositoryIssues($name: String!, $owner: String!) {
		repository(name: $name, owner: $owner) {
			id
			name
			nameWithOwner
			issues(last: 10) {
				totalCount
				nodes {
					id
					bodyText
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

function App() {
	
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

export default App;
