import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as StockTransferReportHeaderService from './stockTransferReportHeader.service';

export const stockTransferReportHeaderRouter = express.Router();

// Get all stock transfer report headers
stockTransferReportHeaderRouter.get('/', async (req: Request, res: Response) => {
  try {
    const stockTransferReportHeaders = await StockTransferReportHeaderService.getStockTransferReportHeaders();
    res.status(200).json(stockTransferReportHeaders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single stock transfer report header by id
stockTransferReportHeaderRouter.get('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const stockTransferReportHeader = await StockTransferReportHeaderService.getStockTransferReportHeaderById(id);
    if (stockTransferReportHeader) {
      res.status(200).json(stockTransferReportHeader);
    } else {
      res.status(404).send('StockTransferReportHeader not found');
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new stock transfer report header
stockTransferReportHeaderRouter.post(
  '/',
  [
    body('reportName').isString(),
    body('reportDate').isISO8601(),
    // Add more validations as necessary
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const stockTransferReportHeader = await StockTransferReportHeaderService.createStockTransferReportHeader(
        req.body,
      );
      res.status(201).json(stockTransferReportHeader);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

// Update a stock transfer report header
stockTransferReportHeaderRouter.put('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const stockTransferReportHeader = await StockTransferReportHeaderService.updateStockTransferReportHeader(
      id,
      req.body,
    );
    res.status(200).json(stockTransferReportHeader);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a stock transfer report header
stockTransferReportHeaderRouter.delete('/:id', param('id').isUUID(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    await StockTransferReportHeaderService.deleteStockTransferReportHeader(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
