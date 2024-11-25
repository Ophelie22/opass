import { PrismaClient } from '@prisma/client';
import { UserQueries } from '../user.queries';

// Create a mock PrismaClient
const prisma = new PrismaClient();

describe('UserQueries', () => {
  // Clear database before each test
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  // Clean up after tests
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'testuser'
      };

      const user = await UserQueries.create(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      // Password should be hashed
      expect(user.password).not.toBe(userData.password);
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'testuser'
      };

      await UserQueries.create(userData);

      await expect(UserQueries.create(userData)).rejects.toThrow();
    });
  });

  describe('findUserById', () => {
    it('should find user by id', async () => {
      // First create a user
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'testuser'
      };
      const createdUser = await UserQueries.create(userData);

      // Then try to find the user
      const foundUser = await UserQueries.findUserById(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(createdUser.id);
      expect(foundUser?.email).toBe(userData.email);
    });

    it('should return null for non-existent id', async () => {
      const foundUser = await UserQueries.findUserById(999);
      expect(foundUser).toBeNull();
    });
  });
});