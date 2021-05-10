export class User{
    constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private role: UserRole
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getNickName(){
        return this.nickname
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getRole(){
        return this.role;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setNickName(nickname: string){
        this.nickname = nickname;
    }

    setEmail(email: string){
        this.email = email;
    }

    setPassword(password: string){
        this.password = password;
    }

    setRole(role: UserRole){
        this.role = role;
    }

   static stringToUserRole(input: string): UserRole{
        switch (input) {
            case "NORMAL":
              return UserRole.NORMAL;
            case "ADMIN":
              return UserRole.ADMIN;
            default:
              throw new Error("Invalid user role");
          }
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.nickname, user.email, user.password, User.stringToUserRole(user.role));
      }


}

export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
    nickname: string;
    role: string;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export interface LoginInputNickDTO{
    nickname: string;
    password: string;
}


export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}