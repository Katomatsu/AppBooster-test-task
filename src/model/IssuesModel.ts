export interface IssueModel {
	id: string;
	bodyHTML: JSX.Element;
	titleHTML: JSX.Element;
	number: number;
  state: 'OPEN' | 'CLOSED'
  closedAt: string
  createdAt: string
	author: {
		login: string;
	};
	comments: {
		totalCount: number;
		nodes: {
			bodyHTML: JSX.Element;
			author: {
				login: string;
			};
		};
	};
}

export interface IssuesModel {
	totalCount: number;
	nodes: IssueModel[];
}
