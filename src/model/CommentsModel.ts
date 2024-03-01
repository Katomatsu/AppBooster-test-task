export interface CommentsModel {
	totalCount: number;
	nodes: CommentModel[];
}

export interface CommentModel {
	bodyHTML: JSX.Element;
  id: string
  createdAt: string
	author: {
		login: string;
	};
}
