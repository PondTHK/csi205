export type MockUser = {
  username: string;
  password: string;
  fullName: string;
};

export const MOCK_USERS: MockUser[] = [
  {
    username: "user",
    password: "password",
    fullName: "user",
  },
  {
    username: "admin",
    password: "pass",
    fullName: "admin",
  },
];
