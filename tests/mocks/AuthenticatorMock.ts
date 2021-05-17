import { UserRole } from "../../src/model/User";

export const AuthenticatorMock = {
  generateToken: jest.fn(
    (payload: { id: string; role: UserRole }) => "token"
  ),
  getData: jest.fn((token: string) => {
    switch (token) {
      case "userToken":
        return { id: "id", role: "NORMAL" };
      case "adminToken":
        return { id: "id", role: "ADMIN" };
      default:
        return undefined;
    }
  }),
}