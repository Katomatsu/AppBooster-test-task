import { Link } from 'react-router-dom';
import { IssueModel } from '../../model/IssuesModel';
import { renderDateAgo } from '../../utils/calcData';

interface IssueItemProps {
	issueData: IssueModel;
}

const IssueItem = ({ issueData }: IssueItemProps) => {
	

	return (
		<li className='border-b-[1px] w-[100%] border-[#30363d] p-2 pl-5 mx-auto flex flex-col items-start'>
			<h2 className='text-xl font-semibold text-left'>
				<Link to={`/${issueData.id}`} className='text-white'>
					<p
						dangerouslySetInnerHTML={{
							__html: issueData.titleHTML
						}}
					/>
				</Link>
			</h2>
			<p className='text-[#7a8b97] text-lg'>
				#{issueData.number}{' '}
				{renderDateAgo(
					issueData.closedAt
						? issueData.closedAt
						: issueData.createdAt,
					issueData.state
				)}{' '}
				by {issueData.author.login}
			</p>
		</li>
	);
};

export default IssueItem;
