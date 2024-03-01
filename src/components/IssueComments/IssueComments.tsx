import { CommentModel, CommentsModel } from '../../model/CommentsModel';
import IssueCommentsItem from './IssueCommentsItem';

interface IssueCommentsProps {
	comments: CommentsModel;
}

const IssueComments = ({ comments }: IssueCommentsProps) => {
	return (
		<ul className='flex flex-col gap-y-10 relative mb-20' >
			{comments.nodes.map((item: CommentModel) => {
				return <IssueCommentsItem key={item.id} commentData={item} />;
			})}
		</ul>
	);
};

export default IssueComments;
