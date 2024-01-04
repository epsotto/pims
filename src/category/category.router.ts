import express from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as CategoryService from './category.service';

export const categoryRouter = express.Router();

// Get all categories
categoryRouter.get('/', async (request: Request, response: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return response.status(200).json(categories);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single category by ID
categoryRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const category = await CategoryService.getCategoryById(id);

    if (category) {
      return response.status(200).json(category);
    }
    return response.status(404).json('Category not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new category
categoryRouter.post(
  '/',
  body('categoryName').isString(),
  body('isActive').isBoolean(),
  body('addedById').isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const category = request.body;
      const newCategory = await CategoryService.createCategory(category);
      return response.status(201).json(newCategory);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update a category
categoryRouter.put(
  '/:id',
  param('id').isUUID(),
  body('categoryName').optional().isString(),
  body('isActive').optional().isBoolean(),
  body('changedById').optional().isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const category = request.body;
      const id = request.params.id;
      const updatedCategory = await CategoryService.updateCategory(category, id);
      return response.status(200).json(updatedCategory);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete a category
categoryRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await CategoryService.deleteCategory(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default categoryRouter;
