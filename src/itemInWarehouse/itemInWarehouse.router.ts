import express from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as ItemInWarehouseService from './itemInWarehouse.service';

export const itemInWarehouseRouter = express.Router();

// Get all items in warehouse
itemInWarehouseRouter.get('/', async (request: Request, response: Response) => {
  try {
    const itemsInWarehouse = await ItemInWarehouseService.getAllItemsInWarehouse();
    return response.status(200).json(itemsInWarehouse);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single item in warehouse by ID
itemInWarehouseRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const itemInWarehouse = await ItemInWarehouseService.getItemInWarehouseById(id);

    if (itemInWarehouse) {
      return response.status(200).json(itemInWarehouse);
    }
    return response.status(404).json('Item in Warehouse not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new item in warehouse
itemInWarehouseRouter.post(
  '/',
  body('quantity').isInt(),
  body('inUnitsOf').isString(),
  body('priceAtCost').isFloat(),
  body('location').isString(),
  body('itemId').isUUID(),
  body('addedById').isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const itemInWarehouse = request.body;
      const newItemInWarehouse = await ItemInWarehouseService.createItemInWarehouse(itemInWarehouse);
      return response.status(201).json(newItemInWarehouse);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update an item in warehouse
itemInWarehouseRouter.put(
  '/:id',
  param('id').isUUID(),
  body('quantity').optional().isInt(),
  body('inUnitsOf').optional().isString(),
  body('priceAtCost').optional().isFloat(),
  body('location').optional().isString(),
  body('changedById').optional().isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const itemInWarehouse = request.body;
      const id = request.params.id;
      const updatedItemInWarehouse = await ItemInWarehouseService.updateItemInWarehouse(itemInWarehouse, id);
      return response.status(200).json(updatedItemInWarehouse);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete an item in warehouse
itemInWarehouseRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await ItemInWarehouseService.deleteItemInWarehouse(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default itemInWarehouseRouter;
