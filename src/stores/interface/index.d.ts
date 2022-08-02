export interface IAppStore {
  siderType: boolean;
  lang: string;
  menuList: Array;
}
export interface ImenuItem {
  id: number;
  authName: string;
  children: Array<ImenuItem>;
  path: string;
}
export interface IUserStore {
  token: string;
}
