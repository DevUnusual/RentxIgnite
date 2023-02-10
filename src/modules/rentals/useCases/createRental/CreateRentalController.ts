import { CreateRentalUseCase } from './CreateRentalUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;
    const { id } = request.user;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id
    })

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };