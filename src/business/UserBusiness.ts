import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";


export class UserBusiness {

constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private userDatabase: UserDatabase
  ) {}

public signup = async (input: UserInputDTO) => {
    try {
        const { name, nickname, email, password, role } = input;
        const userRole = User.stringToUserRole(role);
        if (!name || !nickname || !email || !password || !role) {
          throw new BaseError("Verifique o preenchimento de todos os campos para criar conta", 422);
        }
        if (email.indexOf("@") === -1) {
          throw new BaseError("Formato de email inválido", 422);
        }
        if (password.length < 6) {
          throw new BaseError(
            "O campo senha contém mais de 6 caracteres",
            422
          );
        }
  
        const id = this.idGenerator.generate();
  
        const hashPassword = await this.hashManager.hash(password);
  
        const newUser = new User(
          id,
          name,
          nickname,
          email,
          hashPassword,
          userRole
        );
  
        await this.userDatabase.signup(newUser);
  
        const acessToken = this.authenticator.generateToken({
          id,
          role: role,
        });
  
        return acessToken;
      } catch (error) {
        throw new BaseError(error.message || error.sqlMessage, error.statusCode);
      }
    };
  
    public login = async (input: LoginInputDTO) => {
      try {
        const { email, password } = input;
        if (!email || !password) {
          throw new BaseError("Preencha os campos de email e senha", 422);
        }
        if (email.indexOf("@") === -1) {
          throw new BaseError("Formato e email inválido", 422);
        }
        const userFromDB = await this.userDatabase.getUserByEmail(email);
        if (!userFromDB) {
          throw new BaseError("Credenciais inválidas", 401);
        }
        const hashCompare = await this.hashManager.compare(
          password,
          userFromDB.password
        );
        if (!hashCompare) {
          throw new BaseError("Credenciais inválidas", 401);
        }
        const acessToken = this.authenticator.generateToken({
          id: userFromDB.id,
          role: userFromDB.role,
        });
        return acessToken;
      } catch (error) {
        throw new BaseError(error.message || error.sqlMessage, error.statusCode);
      }
    };
  }