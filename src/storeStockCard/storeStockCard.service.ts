import { db } from '../utils/db.server';

type StoreStockCard = {
  id: string;
  quantityIn: number;
  quantityOut: number;
  addedOn: Date;
  changedOn: Date | null;
  itemInStoreId: string;
  addedById: string;
  changedById: string | null;
};

// Type for creating a new StoreStockCard
type CreateStoreStockCardData = Omit<StoreStockCard, 'id' | 'addedOn' | 'changedOn' | 'changedById'>;

// Type for updating an existing StoreStockCard
type UpdateStoreStockCardData = Omit<StoreStockCard, 'id' | 'addedOn' | 'changedOn'>;

export const getStoreStockCards = async (): Promise<StoreStockCard[]> => {
  return db.storeStockCard.findMany();
};

export const getStoreStockCardById = async (id: string): Promise<StoreStockCard | null> => {
  return db.storeStockCard.findUnique({
    where: { id },
  });
};

export const createStoreStockCard = async (data: CreateStoreStockCardData): Promise<StoreStockCard> => {
  return db.storeStockCard.create({
    data,
  });
};

export const updateStoreStockCard = async (id: string, data: UpdateStoreStockCardData): Promise<StoreStockCard> => {
  return db.storeStockCard.update({
    where: { id },
    data,
  });
};

export const deleteStoreStockCard = async (id: string): Promise<StoreStockCard> => {
  return db.storeStockCard.delete({
    where: { id },
  });
};
