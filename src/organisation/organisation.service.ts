import { db } from '../utils/db.server';

type Organisation = {
  id: string;
  name: string;
  numberOfEdits: number;
  maxNumberOfEdits?: number;
  reportsGenerated: number;
  maxNumberOfReportsToGenerate?: number;
};

export const createOrganisation = async (
  organisation: Omit<Organisation, 'id' | 'numberOfEdits' | 'reportsGenerated'>,
): Promise<Pick<Organisation, 'id'>> => {
  return db.organisation.create({
    data: {
      ...organisation,
      numberOfEdits: 0,
      reportsGenerated: 0,
    },
    select: {
      id: true,
    },
  });
};

export const getOrganisationById = async (id: string): Promise<Organisation | null> => {
  return db.organisation.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      numberOfEdits: true,
      maxNumberOfEdits: true,
      reportsGenerated: true,
      maxNumberOfReportsToGenerate: true,
    },
  });
};

export const getAllOrganisations = async (): Promise<Organisation[]> => {
  return db.organisation.findMany({
    select: {
      id: true,
      name: true,
      numberOfEdits: true,
      maxNumberOfEdits: true,
      reportsGenerated: true,
      maxNumberOfReportsToGenerate: true,
    },
  });
};

export const updateOrganisation = async (organisation: Omit<Organisation, 'id'>, id: string): Promise<Organisation> => {
  return db.organisation.update({
    where: { id },
    data: organisation,
    select: {
      id: true,
      name: true,
      numberOfEdits: true,
      maxNumberOfEdits: true,
      reportsGenerated: true,
      maxNumberOfReportsToGenerate: true,
    },
  });
};

export const deleteOrganisation = async (id: string): Promise<void> => {
  await db.organisation.delete({
    where: { id },
  });
};
