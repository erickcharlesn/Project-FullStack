import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new Authenticator(),
    new HashManager(),
    new UserDatabase()
  );
  
export class UserController {
    public signup = async (req: Request, res: Response) => {
        try {
          const { name, nickname, email, password, role } = req.body;
          const input: UserInputDTO = {
            name,
            nickname,
            email,
            password,
            role,
          };
          const token = await userBusiness.signup(input);
          res.status(201).send({ token });
        } catch (error) {
          res.status(error.statusCode || 400).send({ message: error.message });
        }
      };
    
      public login = async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;
          const input: LoginInputDTO = {
            email,
            password,
          };
          const token = await userBusiness.login(input);
          res.status(200).send({ token });
        } catch (error) {
          res.status(error.statusCode).send({ message: error.message });
        }
      };
    }