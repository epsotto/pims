import express from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as ItemInStoreService from './itemInStore.service';

export const itemInStoreRouter = express.Router();

// Get all items in store
itemInStoreRouter.get('/', async (request: Request, response: Response) => {
  try {
    const itemsInStore = await ItemInStoreService.getAllItemsInStore();
    return response.status(200).json(itemsInStore);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single item in store by ID
itemInStoreRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const itemInStore = await ItemInStoreService.getItemInStoreById(id);

    if (itemInStore) {
      return response.status(200).json(itemInStore);
    }
    return response.status(404).json('Item in Store not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new item in store
itemInStoreRouter.post(
  '/',
  body('quantity').isInt(),
  body('inUnitsOf').isString(),
  body('retailPrice').isFloat(),
  body('itemId').isUUID(),
  body('addedById').isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const itemInStore = request.body;
      const newItemInStore = await ItemInStoreService.createItemInStore(itemInStore);
      return response.status(201).json(newItemInStore);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update an item in store
itemInStoreRouter.put(
  '/:id',
  param('id').isUUID(),
  body('quantity').optional().isInt(),
  body('inUnitsOf').optional().isString(),
  body('retailPrice').optional().isFloat(),
  body('changedById').optional().isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const itemInStore = request.body;
      const id = request.params.id;
      const updatedItemInStore = await ItemInStoreService.updateItemInStore(itemInStore, id);
      return response.status(200).json(updatedItemInStore);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete an item in store
itemInStoreRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await ItemInStoreService.deleteItemInStore(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default itemInStoreRouter;
