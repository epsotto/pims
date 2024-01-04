import { UserRoles } from '@prisma/client';
import { db } from '../utils/db.server';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  userRole: UserRoles;
  organisationId: string;
};

export const getUsers = async (organisationId: string): Promise<User[]> => {
  return db.user.findMany({
    where: { organisationId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isActive: true,
      userRole: true,
      organisationId: true,
    },
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isActive: true,
      userRole: true,
      organisationId: true,
    },
  });
};

export const createUser = async (user: Omit<User, 'id' | 'isActive'>): Promise<Pick<User, 'id'>> => {
  const { firstName, lastName, email, userRole, organisationId } = user;

  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      isActive: true,
      userRole,
      organisationId,
    },
    select: {
      id: true,
    },
  });
};

export const updateUser = async (user: Omit<User, 'id'>, id: string): Promise<User> => {
  const { firstName, lastName, email, isActive, userRole } = user;

  return db.user.update({
    where: { id },
    data: { firstName, lastName, email, isActive, userRole },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isActive: true,
      userRole: true,
      organisationId: true,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.user.delete({
    where: { id },
  });
};
