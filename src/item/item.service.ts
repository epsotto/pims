import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type Item = {
  id: string;
  itemName: string;
  brandName: string;
  sku?: string | null;
  isActive: boolean;
  addedOn: Date;
  changedOn?: Date | null;
  supplierId: string;
  addedById: string;
  changedById?: string | null;
  // Include other relations like categoryMappings, warehouse, store, stockTransfers if necessary
};

export const createItem = async (
  item: Omit<Item, 'id' | 'addedOn' | 'changedOn' | 'changedById' | 'isActive'>,
): Promise<Pick<Item, 'id'>> => {
  return db.item.create({
    data: { ...item, isActive: true },
    select: {
      id: true,
    },
  });
};

export const getItemById = async (id: string): Promise<Item | null> => {
  return db.item.findUnique({
    where: { id },
    select: {
      id: true,
      itemName: true,
      brandName: true,
      sku: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      supplierId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const getAllItems = async (): Promise<Item[]> => {
  return db.item.findMany({
    select: {
      id: true,
      itemName: true,
      brandName: true,
      sku: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      supplierId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const updateItem = async (item: Omit<Item, 'id' | 'addedOn' | 'addedById'>, id: string): Promise<Item> => {
  return db.item.update({
    where: { id },
    data: {
      ...item,
      changedOn: getUtcDateNow(),
    },
    select: {
      id: true,
      itemName: true,
      brandName: true,
      sku: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      supplierId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const deleteItem = async (id: string): Promise<void> => {
  await db.item.delete({
    where: { id },
  });
};
