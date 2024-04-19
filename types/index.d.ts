export interface PostsData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  cPassword: string;
}
