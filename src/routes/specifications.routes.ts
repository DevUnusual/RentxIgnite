import {Router} from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecifications/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = container.resolve(CreateSpecificationController);

specificationsRoutes.post("/", createSpecificationController.handle);

export{specificationsRoutes};