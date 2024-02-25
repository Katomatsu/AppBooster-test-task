export interface IssueModel {
  id: number;
	bodyHTML: JSX.Element;
	author: {
		login: string;
	};
  comments: {
    totalCount: number
  }
}

export interface IssuesModel {
  totalCount: number,
  nodes: IssueModel[]
}