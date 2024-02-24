interface IssueItemProps {
	login: string;
	bodyText: string;
  commentsAmount: number
}

const IssueItem = ({ login, bodyText, commentsAmount }: IssueItemProps) => {
	return (
		<li className='border-[2px] border-zinc-200 list-none my-4 p-2'>
			<h3>
				Issue Author:
				{login}
			</h3>
			<h3>Comments Amount: {commentsAmount}</h3>
			<p>
				Issue:
				{bodyText}
			</p>
		</li>
	);
};

export default IssueItem;
