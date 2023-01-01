import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"



let createRentaUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
  beforeEach(()=>{
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentaUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create a new Rental", async() => {
    const rental = await createRentaUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should be able to create a new Rental with another rent open same user", () => {
    expect(async() => {
      await createRentaUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date()
      })
  
      await createRentaUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("should be able to create a new Rental with another rent open same car", () => {
    expect(async () => {
       await createRentaUseCase.execute({
        user_id: "XXX12",
        car_id: "121212",
        expected_return_date: new Date()
      })
  
      await createRentaUseCase.execute({
        user_id: "XXX1",
        car_id: "121212",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)

  })

})