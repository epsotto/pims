import express from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as SubCategoryService from './subCategory.service';

export const subCategoryRouter = express.Router();

// Get all subcategories
subCategoryRouter.get('/', async (request: Request, response: Response) => {
  try {
    const subCategories = await SubCategoryService.getAllSubCategories();
    return response.status(200).json(subCategories);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single subcategory by ID
subCategoryRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const subCategory = await SubCategoryService.getSubCategoryById(id);

    if (subCategory) {
      return response.status(200).json(subCategory);
    }
    return response.status(404).json('SubCategory not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new subcategory
subCategoryRouter.post(
  '/',
  body('subCategoryName').isString(),
  body('isActive').isBoolean(),
  body('categoryId').isUUID(),
  body('addedById').isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const subCategory = request.body;
      const newSubCategory = await SubCategoryService.createSubCategory(subCategory);
      return response.status(201).json(newSubCategory);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update a subcategory
subCategoryRouter.put(
  '/:id',
  param('id').isUUID(),
  body('subCategoryName').optional().isString(),
  body('isActive').optional().isBoolean(),
  body('changedById').optional().isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const subCategory = request.body;
      const id = request.params.id;
      const updatedSubCategory = await SubCategoryService.updateSubCategory(subCategory, id);
      return response.status(200).json(updatedSubCategory);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete a subcategory
subCategoryRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await SubCategoryService.deleteSubCategory(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default subCategoryRouter;
