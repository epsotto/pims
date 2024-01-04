import { db } from '../utils/db.server';

type Product = {
  id: string;
  name: string;
  isActive: boolean;
};

export const createProduct = async (product: Omit<Product, 'id' | 'isActive'>): Promise<Pick<Product, 'id'>> => {
  return db.product.create({
    data: { ...product, isActive: true },
    select: {
      id: true,
    },
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return db.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });
};

export const getAllProducts = async (): Promise<Product[]> => {
  return db.product.findMany({
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });
};

export const updateProduct = async (product: Omit<Product, 'id'>, id: string): Promise<Product> => {
  return db.product.update({
    where: { id },
    data: product,
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await db.product.delete({
    where: { id },
  });
};
