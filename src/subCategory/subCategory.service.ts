import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type SubCategory = {
  id: string;
  subCategoryName: string;
  isActive: boolean;
  addedOn: Date;
  changedOn?: Date | null;
  categoryId: string;
  addedById: string;
  changedById?: string | null;
};

export const createSubCategory = async (
  subCategory: Omit<SubCategory, 'id' | 'addedOn' | 'changedOn' | 'changedById' | 'isActive'>,
): Promise<Pick<SubCategory, 'id'>> => {
  return db.subCategory.create({
    data: { ...subCategory, isActive: true },
    select: {
      id: true,
    },
  });
};

export const getSubCategoryById = async (id: string): Promise<SubCategory | null> => {
  return db.subCategory.findUnique({
    where: { id },
    select: {
      id: true,
      subCategoryName: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      categoryId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const getAllSubCategories = async (): Promise<SubCategory[]> => {
  return db.subCategory.findMany({
    select: {
      id: true,
      subCategoryName: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      categoryId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const updateSubCategory = async (
  subCategory: Omit<SubCategory, 'id' | 'addedOn' | 'addedById'>,
  id: string,
): Promise<SubCategory> => {
  return db.subCategory.update({
    where: { id },
    data: {
      ...subCategory,
      changedOn: getUtcDateNow(),
    },
    select: {
      id: true,
      subCategoryName: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      categoryId: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const deleteSubCategory = async (id: string): Promise<void> => {
  await db.subCategory.delete({
    where: { id },
  });
};
