import { db } from '../utils/db.server';
import { getUtcDateNow } from '../utils/utcDateNow';

type Category = {
  id: string;
  categoryName: string;
  isActive: boolean;
  addedOn: Date;
  changedOn?: Date | null;
  addedById: string;
  changedById?: string | null;
};

export const createCategory = async (
  category: Omit<Category, 'id' | 'addedOn' | 'changedOn' | 'changedById' | 'isActive'>,
): Promise<Pick<Category, 'id'>> => {
  return db.category.create({
    data: { ...category, isActive: true },
    select: {
      id: true,
    },
  });
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  return db.category.findUnique({
    where: { id },
    select: {
      id: true,
      categoryName: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const getAllCategories = async (): Promise<Category[]> => {
  return db.category.findMany({
    select: {
      id: true,
      categoryName: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const updateCategory = async (
  category: Omit<Category, 'id' | 'changedOn' | 'addedById' | 'addedOn'>,
  id: string,
): Promise<Category> => {
  return db.category.update({
    where: { id },
    data: {
      ...category,
      changedOn: getUtcDateNow(),
    },
    select: {
      id: true,
      categoryName: true,
      isActive: true,
      addedOn: true,
      changedOn: true,
      addedById: true,
      changedById: true,
    },
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await db.category.delete({
    where: { id },
  });
};
