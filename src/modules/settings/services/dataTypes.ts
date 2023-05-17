export type LoginResponse = {
  access: string;
  refresh: string;
};

export type User = {
  first_name: string;
  email: string;
  last_name: string;
  id: number;
  username: string;
  department: string;
};

export type UserProfile = User & {
  last_login: string;
  groups: string[];
};
