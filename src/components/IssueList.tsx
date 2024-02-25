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
						bodyHTML={item.bodyHTML}
						key={item.id}
            id={item.id}
            commentsAmount={item.comments.totalCount}
					/>
				);
			})}
		</ul>
	);
};

export default IssueList;
