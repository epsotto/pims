import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type ItemInStore = {
  id: string;
  quantity: number;
  inUnitsOf: string;
  retailPrice: number;
  addedOn: Date;
  changedOn?: Date | null;
  itemId: string;
  addedById: string;
  changedById?: string | null;
};

export const createItemInStore = async (
  itemInStore: Omit<ItemInStore, 'id' | 'addedOn' | 'changedOn' | 'changedById'>,
): Promise<Pick<ItemInStore, 'id'>> => {
  return db.itemInStore.create({
    data: itemInStore,
    select: {
      id: true,
    },
  });
};

export const getItemInStoreById = async (id: string): Promise<ItemInStore | null> => {
  return db.itemInStore.findUnique({
    where: { id },
    select: {
      id: true,
      quantity: true,
      inUnitsOf: true,
      retailPrice: true,
      addedOn: true,
      changedOn: true,
      itemId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const getAllItemsInStore = async (): Promise<ItemInStore[]> => {
  return db.itemInStore.findMany({
    select: {
      id: true,
      quantity: true,
      inUnitsOf: true,
      retailPrice: true,
      addedOn: true,
      changedOn: true,
      itemId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const updateItemInStore = async (
  itemInStore: Omit<ItemInStore, 'id' | 'addedById' | 'addedOn'>,
  id: string,
): Promise<ItemInStore> => {
  return db.itemInStore.update({
    where: { id },
    data: {
      ...itemInStore,
      changedOn: getUtcDateNow(),
    },
    select: {
      id: true,
      quantity: true,
      inUnitsOf: true,
      retailPrice: true,
      addedOn: true,
      changedOn: true,
      itemId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const deleteItemInStore = async (id: string): Promise<void> => {
  await db.itemInStore.delete({
    where: { id },
  });
};
