import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type ItemInWarehouse = {
  id: string;
  quantity: number;
  inUnitsOf: string;
  priceAtCost: number;
  location: string;
  addedOn: Date;
  changedOn?: Date | null;
  itemId: string;
  addedById: string;
  changedById?: string | null;
};

export const createItemInWarehouse = async (
  itemInWarehouse: Omit<ItemInWarehouse, 'id' | 'addedOn' | 'changedOn' | 'changedById'>,
): Promise<Pick<ItemInWarehouse, 'id'>> => {
  const { quantity, inUnitsOf, priceAtCost, location, itemId, addedById } = itemInWarehouse;

  return db.itemInWarehouse.create({
    data: itemInWarehouse,
    select: {
      id: true,
    },
  });
};

export const getItemInWarehouseById = async (id: string): Promise<ItemInWarehouse | null> => {
  return db.itemInWarehouse.findUnique({
    where: { id },
    select: {
      id: true,
      quantity: true,
      inUnitsOf: true,
      priceAtCost: true,
      location: true,
      addedOn: true,
      changedOn: true,
      itemId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const getAllItemsInWarehouse = async (): Promise<ItemInWarehouse[]> => {
  return db.itemInWarehouse.findMany({
    select: {
      id: true,
      quantity: true,
      inUnitsOf: true,
      priceAtCost: true,
      location: true,
      addedOn: true,
      changedOn: true,
      itemId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const updateItemInWarehouse = async (
  itemInWarehouse: Omit<ItemInWarehouse, 'id' | 'addedById' | 'addedOn'>,
  id: string,
): Promise<ItemInWarehouse> => {
  return db.itemInWarehouse.update({
    where: { id },
    data: {
      ...itemInWarehouse,
      changedOn: getUtcDateNow(),
    },
    select: {
      id: true,
      quantity: true,
      inUnitsOf: true,
      priceAtCost: true,
      location: true,
      addedOn: true,
      changedOn: true,
      itemId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const deleteItemInWarehouse = async (id: string): Promise<void> => {
  await db.itemInWarehouse.delete({
    where: { id },
  });
};
