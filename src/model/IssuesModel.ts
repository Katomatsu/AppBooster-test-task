export interface IssueModel {
  id: number;
	bodyText: string;
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