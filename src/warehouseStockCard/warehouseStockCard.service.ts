import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type WarehouseStockCard = {
  id: string;
  quantityIn: number;
  quantityOut: number;
  addedOn: Date;
  changedOn: Date | null;
  itemInWarehouseId: string;
  addedById: string;
  changedById: string | null;
};

// Type for creating a new WarehouseStockCard
type CreateWarehouseStockCardData = Omit<WarehouseStockCard, 'id' | 'addedOn' | 'changedOn' | 'changedById'>;

// Type for updating an existing WarehouseStockCard
type UpdateWarehouseStockCardData = Omit<WarehouseStockCard, 'id' | 'addedOn' | 'addedById' | 'changedOn'>;

export const getWarehouseStockCards = async (): Promise<WarehouseStockCard[]> => {
  return db.warehouseStockCard.findMany();
};

export const getWarehouseStockCardById = async (id: string): Promise<WarehouseStockCard | null> => {
  return db.warehouseStockCard.findUnique({
    where: { id },
  });
};

export const createWarehouseStockCard = async (data: CreateWarehouseStockCardData): Promise<WarehouseStockCard> => {
  return db.warehouseStockCard.create({
    data,
  });
};

export const updateWarehouseStockCard = async (
  id: string,
  data: UpdateWarehouseStockCardData,
): Promise<WarehouseStockCard> => {
  return db.warehouseStockCard.update({
    where: { id },
    data: { ...data, changedOn: getUtcDateNow() },
  });
};

export const deleteWarehouseStockCard = async (id: string): Promise<WarehouseStockCard> => {
  return db.warehouseStockCard.delete({
    where: { id },
  });
};
