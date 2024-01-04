import express from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as ProductService from './product.service';

export const productRouter = express.Router();

// Get all products
productRouter.get('/', async (request: Request, response: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    return response.status(200).json(products);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single product by ID
productRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const product = await ProductService.getProductById(id);

    if (product) {
      return response.status(200).json(product);
    }
    return response.status(404).json('Product not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new product
productRouter.post('/', body('name').isString(), async (request: Request, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    const product = request.body;
    const newProduct = await ProductService.createProduct(product);
    return response.status(201).json(newProduct);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Update a product
productRouter.put(
  '/:id',
  param('id').isUUID(),
  body('name').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const product = request.body;
      const id = request.params.id;
      const updatedProduct = await ProductService.updateProduct(product, id);
      return response.status(200).json(updatedProduct);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete a product
productRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await ProductService.deleteProduct(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default productRouter;
