import { IssuesModel } from '../model/IssuesModel';
import IssueItem from './IssueItem';

interface IssueListProps {
	issues: IssuesModel;
}

const IssueList = ({ issues }: IssueListProps) => {
	return (
		<ul>
			{issues.nodes.map(item => {
				return (
					<IssueItem
						login={item.author.login}
						bodyText={item.bodyText}
						key={item.id}
            commentsAmount={item.comments.totalCount}
					/>
				);
			})}
		</ul>
	);
};

export default IssueList;
