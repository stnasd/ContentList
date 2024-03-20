export interface IRepoEntry {
  data: Array<IItemid>;
}

export interface IItemid {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface IPostList {
  data: Array<IItemid>;
}
export interface IItemid {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface ICombinedInterface extends IPostList, IItemid {}
