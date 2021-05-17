import { BandDatabase } from "../data/BandDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness{
    constructor(
    private bandDatabase: BandDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
    ){}

    async registerBand(input: BandInputDTO, token: string){
        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("Somente Admins podem acessar")
        }

        if (!input.name || !input.mainGenre || !input.responsible) {
            throw new InvalidInputError("Entrada inválida para registrar banda")
        }

        await this.bandDatabase.createBand(
            Band.toBand({
                ...input,
                id: this.idGenerator.generate()
            })!
        )
    }

    async getBandDetailByIdOrName(input: string): Promise<Band> {

        if (!input){
            throw new InvalidInputError("Entrada inválida para detalhes da banda")
        }

        return this.bandDatabase.getBandByIdOrNameFail(input)
    }

}