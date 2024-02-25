import { Link } from 'react-router-dom';

interface IssueItemProps {
	login: string;
	bodyHTML: JSX.Element;
	commentsAmount: number;
	id: number;
}

const IssueItem = ({ login, bodyHTML, commentsAmount, id }: IssueItemProps) => {
	return (
		<li className='border-[2px] w-[100%] border-zinc-200 list-none my-4 p-2 mx-auto overflow-x-auto whitespace-pre-wrap'>
			<h3>
				Issue Author:
				{login}
			</h3>
			<h3>Comments Amount: {commentsAmount}</h3>
			<div className='w-[90%] mx-auto break-words'>
				Issue:
				<div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
			</div>
			<p>
				<Link to={`/${id}`} className='text-[#9579c0]'>
					Go to this issue page
				</Link>
			</p>
		</li>
	);
};

export default IssueItem;
