import { CommentModel } from '../../model/CommentsModel';
import { verticalLine } from '../../styles';
import { renderDateAgo } from '../../utils/calcData';

interface IssueCommentsItemProps {
	commentData: CommentModel;
}

const IssueCommentsItem = ({ commentData }: IssueCommentsItemProps) => {
	return (
		<li className='border-[1px] w-[100%] border-[#30363d] overflow-visible text-left rounded-lg relative'>
			<header className=' block bg-[#161b22] w-[100%] px-4 py-1.5 rounded-t-lg'>
				<h2 className='text-[18px]'>
					{commentData.author.login}{' '}
					<span className='text-[#848d97] text-[15px]'>
						{renderDateAgo(commentData.createdAt)}
					</span>
				</h2>
			</header>
			<p className={`${verticalLine} absolute top-[-41px] left-[15px]`} />
			<div
				className='space-y-5 p-4'
				dangerouslySetInnerHTML={{
					__html: commentData.bodyHTML
				}}
			/>
		</li>
	);
};

export default IssueCommentsItem;
