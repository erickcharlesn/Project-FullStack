import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  public signup = async (user: User): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          password: user.password,
          role: user.role,
        })
        .into(this.TABLE_NAME.users);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public getUserByEmail = async (email: string): Promise<User> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.TABLE_NAME.users)
        .where({ email });
      return User.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}

export default new UserDatabase();
