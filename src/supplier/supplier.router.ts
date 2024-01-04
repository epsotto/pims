import express from 'express';
import type { Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import * as SupplierService from './supplier.service';

export const supplierRouter = express.Router();

// Get all suppliers
supplierRouter.get('/', query('organisationId').isString(), async (request: Request, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    const organisationId = request.query.organisationId as string;
    const suppliers = await SupplierService.getAllSuppliers(organisationId);
    return response.status(200).json(suppliers);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single supplier by ID
supplierRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const supplier = await SupplierService.getSupplierById(id);

    if (supplier) {
      return response.status(200).json(supplier);
    }
    return response.status(404).json('Supplier not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new supplier
supplierRouter.post(
  '/',
  body('supplierName').isString(),
  body('address').optional().isString(),
  body('contactNumber').optional().isString(),
  body('isActive').isBoolean(),
  body('addedById').isUUID(),
  body('organisationId').isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const supplier = request.body;
      const newSupplier = await SupplierService.createSupplier(supplier);
      return response.status(201).json(newSupplier);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update a supplier
supplierRouter.put(
  '/:id',
  body('supplierName').optional().isString(),
  body('address').optional().isString(),
  body('contactNumber').optional().isString(),
  body('isActive').optional().isBoolean(),
  body('changedById').optional().isUUID(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const supplier = request.body;
      const id = request.params.id;
      const updatedSupplier = await SupplierService.updateSupplier(supplier, id);
      return response.status(200).json(updatedSupplier);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete a supplier
supplierRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await SupplierService.deleteSupplier(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default supplierRouter;
