import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'



let createRentaUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider();
    createRentaUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
  })

  it("should be able to create a new Rental", async () => {
    const rental = await createRentaUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should be able to create a new Rental with another rent open same user", () => {
    expect(async () => {
      await createRentaUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      })

      await createRentaUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("should be able to create a new Rental with another rent open same car", () => {
    expect(async () => {
      await createRentaUseCase.execute({
        user_id: "XXX12",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      })

      await createRentaUseCase.execute({
        user_id: "XXX1",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("should not be able to create a new Rental with invalid return time", async () => {
    expect(async () => {
      await createRentaUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayjs().toDate()
      })
    }).rejects.toBeInstanceOf(AppError)
  })

})