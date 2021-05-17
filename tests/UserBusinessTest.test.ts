import { UserBusiness } from "../src/business/UserBusiness";
import {  UserRole } from "../src/model/User";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";
import { HashManagerMock } from "./mocks/HashManagerMock";

const userBusiness = new UserBusiness(
  IdGeneratorMock as any,
  AuthenticatorMock as any,
  HashManagerMock as any,
  UserDatabaseMock as any
);

describe("Signup", () => {
  test("Erro quando o nome está em branco", async () => {
    expect.assertions(2);
    const newUser = {
      name: "",
      email: "erickadmin@gmail.com",
      nickname: "Erickadmin",
      password: "123456",
      role: UserRole.ADMIN,
    };
    try {
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Parametros inválidos para criar conta");
    }
  });
  test("Erro quando o email é inválido", async () => {
    expect.assertions(2);
    try {
      const newUser = {
        name: "Erick",
        email: "erickadmin.com",
        nickname: "Erickadmin",
        password: "123456",
        role: UserRole.ADMIN,
      };
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Formato de email inválido");
    }
  });
  test("Erro quando a senha é inválida", async () => {
    expect.assertions(2);
    try {
      const newUser = {
        name: "Erick",
        email: "erickadmin@gmail.com",
        nickname: "Erickadmin",
        password: "123",
        role: UserRole.ADMIN,
      };
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "A senha deve conter no mínimo 6 caracteres"
      );
    }
  });
  test("Erro quando o cargo é inválido", async () => {
    expect.assertions(2);
    try {
      const newUser = {
        name: "Erick",
        email: "erickadmin@gmail.com",
        nickname: "Erickadmin",
        password: "123456",
        role: "TESTE",
      };
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Cargo inválido");
    }
  });
});

describe("Login", () => {
  test("Erro quando o email está em branco", async () => {
    expect.assertions(2);
    const newUser = {
      email: "",
      password: "123456",
    };
    try {
      await userBusiness.login(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Preencha os campos email e senha");
    }
  });
});