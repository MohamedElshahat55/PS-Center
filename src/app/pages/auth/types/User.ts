export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export default interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
}
