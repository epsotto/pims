import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type Supplier = {
  id: string;
  supplierName: string;
  organisationId: string;
  address?: string | null;
  contactNumber?: string | null;
  isActive: boolean;
  addedById: string;
  addedOn: Date;
  changedById?: string | null;
  changedOn?: Date | null;
};

export const createSupplier = async (
  supplier: Omit<Supplier, 'id' | 'addedOn' | 'changedById' | 'changedOn' | 'isActive'>,
): Promise<Pick<Supplier, 'id'>> => {
  return db.supplier.create({
    data: {
      ...supplier,
      isActive: true,
    },
    select: {
      id: true,
    },
  });
};

export const getSupplierById = async (id: string): Promise<Supplier | null> => {
  return db.supplier.findUnique({
    where: { id },
    select: {
      id: true,
      supplierName: true,
      organisationId: true,
      address: true,
      contactNumber: true,
      isActive: true,
      addedById: true,
      addedOn: true,
      changedById: true,
      changedOn: true,
    },
  });
};

export const getAllSuppliers = async (organisationId: string): Promise<Supplier[]> => {
  return db.supplier.findMany({
    where: { organisationId },
    select: {
      id: true,
      supplierName: true,
      organisationId: true,
      address: true,
      contactNumber: true,
      isActive: true,
      addedById: true,
      addedOn: true,
      changedById: true,
      changedOn: true,
    },
  });
};

export const updateSupplier = async (
  supplier: Omit<Supplier, 'id' | 'addedById' | 'addedOn'>,
  id: string,
): Promise<Supplier> => {
  return db.supplier.update({
    where: { id },
    data: {
      ...supplier,
      changedOn: getUtcDateNow(),
    },
    select: {
      id: true,
      supplierName: true,
      organisationId: true,
      address: true,
      contactNumber: true,
      isActive: true,
      addedById: true,
      addedOn: true,
      changedById: true,
      changedOn: true,
    },
  });
};

export const deleteSupplier = async (id: string): Promise<void> => {
  await db.supplier.delete({
    where: { id },
  });
};
