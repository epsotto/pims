import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type StockTransferReportHeader = {
  id: string;
  reportName: string;
  reportDate: Date;
  addedOn: Date;
  changedOn: Date | null;
  addedById: string;
  changedById: string | null;
};

// Type for creating a new StockTransferReportHeader
type CreateStockTransferReportHeaderData = Omit<
  StockTransferReportHeader,
  'id' | 'addedOn' | 'changedOn' | 'changedById'
>;

// Type for updating an existing StockTransferReportHeader
type UpdateStockTransferReportHeaderData = Omit<
  StockTransferReportHeader,
  'id' | 'addedOn' | 'changedOn' | 'addedById'
>;

export const getStockTransferReportHeaders = async (): Promise<StockTransferReportHeader[]> => {
  return db.stockTransferReportHeader.findMany();
};

export const getStockTransferReportHeaderById = async (id: string): Promise<StockTransferReportHeader | null> => {
  return db.stockTransferReportHeader.findUnique({
    where: { id },
  });
};

export const createStockTransferReportHeader = async (
  data: CreateStockTransferReportHeaderData,
): Promise<StockTransferReportHeader> => {
  return db.stockTransferReportHeader.create({
    data,
  });
};

export const updateStockTransferReportHeader = async (
  id: string,
  data: UpdateStockTransferReportHeaderData,
): Promise<StockTransferReportHeader> => {
  return db.stockTransferReportHeader.update({
    where: { id },
    data: { ...data, changedOn: getUtcDateNow() },
  });
};

export const deleteStockTransferReportHeader = async (id: string): Promise<StockTransferReportHeader> => {
  return db.stockTransferReportHeader.delete({
    where: { id },
  });
};
