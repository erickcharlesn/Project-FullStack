import { User } from "../../src/model/User";

export const UserDatabaseMock = {
  createUser: jest.fn(async (user: User) => {}),
}
