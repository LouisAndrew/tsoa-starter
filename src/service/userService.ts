import { User } from "../schema/userSchema.js";

export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export const usersService = {
  get: (id: number, name?: string): User => ({
    id,
    email: "jane@doe.com",
    name: name ?? "Jane Doe",
    status: "Happy",
    phoneNumbers: [],
  }),
  create: (userCreationParams: UserCreationParams): User => ({
    id: Math.floor(Math.random() * 10000),
    status: "Happy",
    ...userCreationParams,
  }),
};
