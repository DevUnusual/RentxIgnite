import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"


let authenticaUserUseCase : AuthenticateUserUseCase
let usersRepositoryInMemory : UsersRepositoryInMemory
let createUserUseCase : CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticaUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    })

    it("should be able to authenticate user", () => {
        const user : ICreateUserDTO = {
            driver_license : "123456",
            
        }
    })
})