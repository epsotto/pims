import express from 'express';
import type { Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import * as UserService from './user.service';

export const userRouter = express.Router();

userRouter.get('/', query('organisationId').isString(), async (request: Request, response: Response) => {
  const organisationId = request.query.organisationId as string;

  try {
    const users = await UserService.getUsers(organisationId);
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

userRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const user = await UserService.getUserById(id);

    if (user) {
      return response.status(200).json(user);
    }
    return response.status(404).json('User not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

userRouter.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isString(),
  body('userRole').isString(),
  body('organisationId').isUUID(),
  async (request: Request, response: Response) => {
    const error = validationResult(request);

    if (!error.isEmpty()) {
      return response.status(400).json({ errors: error.array() });
    }

    try {
      const user = request.body;
      const newUser = await UserService.createUser(user);
      return response.status(200).json(newUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

userRouter.put(
  '/:id',
  param('id').isUUID(),
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isString(),
  body('userRole').isString(),
  body('organisationId').isUUID(),
  async (request: Request, response: Response) => {
    const error = validationResult(request);

    if (!error.isEmpty()) {
      return response.status(400).json({ errors: error.array() });
    }

    try {
      const user = request.body;
      const id = request.params.id;
      const updatedUser = UserService.updateUser(user, id);
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

userRouter.delete('/:id', param('id').isUUID(), async (request: Request, response: Response) => {
  const error = validationResult(request);

  if (!error.isEmpty()) {
    return response.status(400).json({ errors: error.array() });
  }

  try {
    const id = request.params.id;
    UserService.deleteUser(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
