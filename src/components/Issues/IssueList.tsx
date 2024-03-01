import { IssuesModel } from '../../model/IssuesModel';
import IssueItem from './IssueItem';

interface IssueListProps {
	issues: IssuesModel;
}

const IssueList = ({ issues }: IssueListProps) => {
	return (
		<ul className='border-[1px] border-[#30363d] rounded-lg'>
			{issues.nodes.map(issueData => {
				return <IssueItem key={issueData.id} issueData={issueData} />;
			})}
		</ul>
	);
};

export default IssueList;
