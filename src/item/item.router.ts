import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as ItemService from './item.service';

export const itemRouter = express.Router();

// Get all items
itemRouter.get('/', async (request: Request, response: Response) => {
  try {
    const items = await ItemService.getAllItems();
    return response.status(200).json(items);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single item by ID
itemRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const item = await ItemService.getItemById(id);

    if (item) {
      return response.status(200).json(item);
    }
    return response.status(404).json('Item not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new item
itemRouter.post(
  '/',
  body('itemName').isString(),
  body('brandName').isString(),
  body('sku').optional().isString(),
  body('isActive').isBoolean(),
  body('supplierId').isUUID(),
  body('addedById').isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const item = request.body;
      const newItem = await ItemService.createItem(item);
      return response.status(201).json(newItem);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update an item
itemRouter.put(
  '/:id',
  body('itemName').optional().isString(),
  body('brandName').optional().isString(),
  body('sku').optional().isString(),
  body('isActive').optional().isBoolean(),
  body('changedById').optional().isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const item = request.body;
      const id = request.params.id;
      const updatedItem = await ItemService.updateItem(item, id);
      return response.status(200).json(updatedItem);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete an item
itemRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await ItemService.deleteItem(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default itemRouter;
