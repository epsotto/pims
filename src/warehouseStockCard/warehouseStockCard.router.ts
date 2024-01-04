import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as WarehouseStockCardService from './warehouseStockCard.service';

export const warehouseStockCardRouter = express.Router();

// Get all warehouse stock cards
warehouseStockCardRouter.get('/', async (req: Request, res: Response) => {
  try {
    const warehouseStockCards = await WarehouseStockCardService.getWarehouseStockCards();
    res.status(200).json(warehouseStockCards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single warehouse stock card by id
warehouseStockCardRouter.get('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const warehouseStockCard = await WarehouseStockCardService.getWarehouseStockCardById(id);
    if (warehouseStockCard) {
      res.status(200).json(warehouseStockCard);
    } else {
      res.status(404).send('WarehouseStockCard not found');
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new warehouse stock card
warehouseStockCardRouter.post(
  '/',
  [body('quantityIn').isInt(), body('quantityOut').isInt()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const warehouseStockCard = await WarehouseStockCardService.createWarehouseStockCard(req.body);
      res.status(201).json(warehouseStockCard);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update a warehouse stock card
warehouseStockCardRouter.put('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const warehouseStockCard = await WarehouseStockCardService.updateWarehouseStockCard(id, req.body);
    res.status(200).json(warehouseStockCard);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a warehouse stock card
warehouseStockCardRouter.delete('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    await WarehouseStockCardService.deleteWarehouseStockCard(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
