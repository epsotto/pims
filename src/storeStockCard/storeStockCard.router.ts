import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as StoreStockCardService from './storeStockCard.service';

export const storeStockCardRouter = express.Router();

// Get all store stock cards
storeStockCardRouter.get('/', async (req: Request, res: Response) => {
  try {
    const storeStockCards = await StoreStockCardService.getStoreStockCards();
    res.status(200).json(storeStockCards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single store stock card by id
storeStockCardRouter.get('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const storeStockCard = await StoreStockCardService.getStoreStockCardById(id);
    if (storeStockCard) {
      res.status(200).json(storeStockCard);
    } else {
      res.status(404).send('StoreStockCard not found');
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new store stock card
storeStockCardRouter.post(
  '/',
  [body('quantityIn').isInt(), body('quantityOut').isInt()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const storeStockCard = await StoreStockCardService.createStoreStockCard(req.body);
      res.status(201).json(storeStockCard);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update a store stock card
storeStockCardRouter.put('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const storeStockCard = await StoreStockCardService.updateStoreStockCard(id, req.body);
    res.status(200).json(storeStockCard);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a store stock card
storeStockCardRouter.delete('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    await StoreStockCardService.deleteStoreStockCard(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
